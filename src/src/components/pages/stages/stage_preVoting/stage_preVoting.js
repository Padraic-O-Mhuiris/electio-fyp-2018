import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import StatusBar from '../../extras/statusBar'

import CalendarVote from './calendarVote'
import ElectionInfo from './electionInfo'


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
    <div className="step-item is-active">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-map-marker"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Pre-Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker"></div>
      <div className="step-details">
        <p className="step-title">Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker"></div>
      <div className="step-details">
        <p className="step-title">Post-Voting</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker">
      </div>
      <div className="step-details">
        <p className="step-title">Tally</p>
      </div>
    </div>
  </div>
)

const VoterInfo = (props) => (
        
  <div className="columns">
    <div className="column is-2">
    </div>
    <div className="column is-8">
      <article className="message is-medium">
        <div className="message-body">
           The voting period has not been declared yet. Please come back when the election has begun!
        </div>
      </article>
    </div>
    <div className="column is-2">
    </div>
  </div>
)

const ObserverInfo = () => (
        
  <div className="columns">
    <div className="column is-2">
    </div>
    <div className="column is-8">
      <article className="message is-medium">
        <div className="message-body">
           You are not a valid participant in this election. You can view the result of this election when it is over
        </div>
      </article>
    </div>
    <div className="column is-2">
    </div>
  </div>
)

const view = null

class StagePreVoting extends Component {

    changeView(props) {
      if(this.props.user !== "Observer") {
        if(parseInt(props.election.v_begin) === 0) {
          if(props.metaMask.account === props.election.admin) {
            view = (<CalendarVote {...props}/>)
          
          } else {
            view = <VoterInfo {...props}/>

          }
        } else {

          var time = new Date(props.election.v_begin*1000) + ""
          view = <ElectionInfo {...props} time={time}/>

        }
      
      } else {
        view = <ObserverInfo/>
      }
    }

    componentWillMount() {
      this.changeView(this.props)
    }
  
    componentWillUpdate() {
      this.changeView(this.props)
    }

    render() {
        console.log(this.props)
        return (
            <div className="box has-text-centered">
            <Steps/>
            <div className="election">
              <h1 className="title">{this.props.election.name}</h1>
              <h2 className="subtitle-monospace">Election: {this.props.election.voting_address}</h2>
              <StatusBar {...this.props}/>
              <br/>
              <div className="is-divider"></div>
              <br/>
              {view}
              <br/>             
            </div>
          </div>
        )
    }
}

export default StagePreVoting