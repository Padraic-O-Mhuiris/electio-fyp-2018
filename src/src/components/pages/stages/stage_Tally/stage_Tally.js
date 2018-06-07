import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import StatusBar from '../../extras/statusBar'
import helper from '../../../../helper'
import stv from '../../../../stv'
import Table from '../../extras/table'
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';

const Steps = () => (
    <div className="steps stepx">
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Pre-Election</p>
      </div>
    </div>
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Registration</p>
      </div>
    </div>
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Pre-Voting</p>
      </div>
    </div>
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Voting</p>
      </div>
    </div>
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Post-Voting</p>
      </div>
    </div>
    <div className="step-item is-completed">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Tally</p>
      </div>
    </div>
  </div>
)

const LoadingInfo = () => (
  <div>
    <div className="columns">
      <div className="column is-2">
      </div>
      <div className="column is-8">
        <article className="message is-medium">
          <div className="message-body">
            <h2 className="subtitle">Calculating the Results!</h2>
          </div>
        </article>
      </div>
      <div className="column is-2">
      </div>
    </div>
  </div>
)

const ElectionResult = (props) => {
  if(props.election_type === "1") {
    return (
      <div>
        <h1 className="title">Election Result</h1>
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column is-8"><Pie
              data={props.chartdata}
              options={{
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }}}
            /></div>
          <div className="column is-2"></div>
        </div>    
        <br/>
        <br/>
        <Table
          data={props.result}
          header={[
            {
                name: "#",
                prop: "index"
            },
            {
                name: "Motion",
                prop: "motion"
            },
            {
              name: "Votes",
              prop: "votes"
            },
          ]}
        />
      </div>
    )
  } else if(props.election_type === "2") {    

    var buffer = []
    var smallBuffer = []

    for(var i = 0; i < props.stvChart.length; i++) {
      if(smallBuffer.length % 3 === 0) {
        buffer.push(<div className="columns">{smallBuffer}</div>)
        smallBuffer = []
      }
      smallBuffer.push(props.stvChart[i])
    }

    buffer.push(<div className="columns">{smallBuffer}</div>)
    return (
      <div>
        <h1 className="title">Election Result</h1>
        <h2 className="subtitle">Quota :: {props.quota}</h2>
        <h2 className="subtitle">Seats :: {props.seats}</h2>
        <h2 className="subtitle">{props.winners}</h2>
        <br/>
        <div>{buffer}</div>
        <br/>
        <br/>
        <Table
          data={props.result}
          header={props.header}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h1 className="title">Election Result</h1>
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column is-8"><Pie
              data={props.chartdata}
              options={{
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }}}
            /></div>
          <div className="column is-2"></div>
        </div> 
        <br/>
        <br/>
        <Table
          data={props.result}
          header={[
            {
                name: "#",
                prop: "index"
            },
            {
                name: "Name",
                prop: "name"
            },
            {
                name: "Address",
                prop: "address"
            },
            {
              name: "Votes",
              prop: "votes"
            },
          ]}
        />
      </div>
    )
  }
}

const view = <LoadingInfo/>

class StageTally extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quota: null,
      winners: null,
      header: null,
      result: null,
      loaded: false,
      seats: 0,
      stvChart: [],
      chartdata: {},
      election_type: null
    }

    this.changeView = this.changeView.bind(this)
  }
  
  async getElectionResult() {
    var votes = []
    for(var i = 0; i < this.props.election.ballots.length; i++) {
      votes.push(this.props.election.ballots[i].vote)
    }

    var encryptedTally = await helper.tally(votes, this.props.election.public_key)
    var decryptedTally = await helper.decrypt(encryptedTally, this.props.election.public_key, this.props.election.private_key)
    var winnerIndexes = await helper.calculateWinner(decryptedTally.toString(2), this.props.election.ballots.length, this.props.election.candidates.length)
    var _result = []
    var _labels = []
    var _votes = []
    var colours = []
    
    for(var i = 0; i < winnerIndexes.length; i++) {
      var cName = this.props.election.candidates[i].first_name + " " + this.props.election.candidates[i].last_name
      var cColour = '#' + this.props.election.candidates[i].address.substring(2,8)
      var obj = {
        "index" : winnerIndexes[i].index,
        "name" : cName,
        "address" : this.props.election.candidates[i].address,
        "votes" : winnerIndexes[i].votes
      }
      _labels.push(cName)
      _result.push(obj)
      _votes.push(winnerIndexes[i].votes)
      colours.push(cColour)
    }

    var _chartData = {
      labels : _labels,
      datasets: [{
        data: _votes,
        label: 'Votes',
        backgroundColor: colours
      }],  
    }

    this.setState({
      result: _result,
      loaded: true,
      chartdata: _chartData,
      election_type: "0"
    })

    this.changeView()
  }

  async getElectionMotionResult() {
    var votes = []
    
    for(var i = 0; i < this.props.election.ballots.length; i++) {
      votes.push(this.props.election.ballots[i].vote)
    }

    var encryptedTally = await helper.tally(votes, this.props.election.public_key)
    var decryptedTally = await helper.decrypt(encryptedTally, this.props.election.public_key, this.props.election.private_key)
    var numMotions = (await this.props.registration.methods.getCounts().call())[5]
    var winnerIndexes = await helper.calculateWinner(decryptedTally.toString(2), this.props.election.ballots.length, numMotions)

    var _result = []
    var _labels = []
    var _votes = []
    var colours = []
    
    for(var i = 0; i < winnerIndexes.length; i++) {
      var motion = await this.props.registration.methods.motions(i).call()
      var cColour = '#' + this.props.election.ballots[i].vote.substring(2,8)
      var obj = {
        "index" : winnerIndexes[i].index,
        "motion" : motion,
        "votes" : winnerIndexes[i].votes
      }
      _labels.push(motion)
      _result.push(obj)
      _votes.push(winnerIndexes[i].votes)
      colours.push(cColour)
    }

    var _chartData = {
      labels : _labels,
      datasets: [{
        data: _votes,
        label: 'Votes',
        backgroundColor: colours
      }],
      
    }

    this.setState({
      result: _result,
      loaded: true,
      chartdata: _chartData,
      election_type: "1"
    })


    this.changeView()
  }

  async getElectionSTVResult() {
    var votes = []
    
    for(var i = 0; i < this.props.election.ballots.length; i++) {
      var _vote = await helper.decrypt(this.props.election.ballots[i].vote, this.props.election.public_key, this.props.election.private_key)
      _vote += ""
      var x = _vote.slice(1).match(/.{1,2}/g)
      var finalVotes = []
      for(var j = 0; j < x.length; j++) {
        finalVotes.push(parseInt(x[j]))
      }
      votes.push(finalVotes)
    }

    var seats = await this.props.voting.methods.numSeats().call()
    var resultObj = await stv.calculateSTVWinners(votes, parseInt(seats, 10), this.props.election.candidates.length)
    console.log(resultObj)
    var winnerString = "Winners : "
    for(var j = 0; j < resultObj.winners.length; j++) {
      winnerString += this.props.election.candidates[resultObj.winners[j]].first_name + " " + this.props.election.candidates[resultObj.winners[j]].last_name + ", "
    }

    var header = []
    var results = []

    header.push({name: "#", prop: "index"})
    header.push({name: "Name", prop: "name"})

    var _stvCharts = []
    

    for(var i = 0; i < resultObj.counts.length; i++) {

      var obj = {
        "index" : i,
        "name" : this.props.election.candidates[i].first_name + " " + this.props.election.candidates[i].last_name
      }

      var _labels = []
      var _colours = []
      var _data = resultObj.counts[i]
      var _label = "Count " + (i + 1)

      for(var j = 0; j < this.props.election.candidates.length; j++) {
        _labels.push(this.props.election.candidates[j].first_name + " " + this.props.election.candidates[j].last_name),
        _colours.push('#' + this.props.election.candidates[j].address.substring(2,8))
      }

      header.push({name: "Count " + (i + 1), prop: "count_" + (i + 1)})
      var _chartData = {
        labels : _labels,
        datasets: [{
          data: _data,
          label: _label,
          backgroundColor: _colours
        }]
      }

      _stvCharts.push(
        <div className="column is-4"><Bar
          data={_chartData}
          options={{
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }}}
        /></div>
      )

      for(var j = 0; j < resultObj.counts.length; j++) {
        var count = "count_" + (j + 1)
        obj[count] = resultObj.counts[j][i]
      }

      results.push(obj)
    }
    
    this.setState({
      quota: resultObj.quota,
      winners: winnerString,
      seats: seats,
      header: header,
      result: results,
      stvChart: _stvCharts,
      loaded: true,
      election_type: "2"
    })

    this.changeView()
  }

  changeView() {
    view = <ElectionResult {...this.state}/>
    this.forceUpdate()
  }

  componentDidMount() {
    if(this.props.election.election_type === "1") {
      this.getElectionMotionResult()
    } else if(this.props.election.election_type === "2") {
      this.getElectionSTVResult()
    } else {
      this.getElectionResult()
    }
    
  }
  
  render() {
    return (
      <div className="box has-text-centered">
        <Steps/>
        <div className="election">
          <h1 className="title">{this.props.election.name}</h1>
          <br/>
          <h2 className="subtitle-monospace">Election: {this.props.election.voting_address}</h2>
          <br/>
          <StatusBar {...this.props}/>
          <br/>
          <div className="is-divider"></div>
          <br/>
          {view}
          
        </div>
      </div>
    )
  }
}

export default StageTally