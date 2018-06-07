import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import StatusBar from '../../extras/statusBar'
import Timer from '../../extras/timer'
import NotVoted from './notVoted'
import NotVotedMotion from './notVotedMotion'
import NotVotedSTV from './notVotedSTV'
import VotesTable from './votesTable'

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
    <div className="step-item is-active">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-map-marker"></i>
        </span>
      </div>
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

const Voted = (props) => (
  <div>
  <div className="columns">
    <div className="column is-2">
    </div>
    <div className="column is-8">
      <article className="message is-medium">
        <div className="message-body">
           You have already voted in this election. Please come back to view the results after the voting period
        </div>
      </article>
    </div>
    <div className="column is-2">
    </div>
  </div>
  <VotesTable {...props}/>
  </div>

)

const view = null

class StageVoting extends Component {

    changeView() {
      if(this.props.user !== "Observer") {

        if(this.props.metaMask.account === this.props.election.admin) {
          view = <VotesTable {...this.props}/>
        
        } else {

          if(this.props.election.status_voter.voted) {
            view = <Voted {...this.props}/>
          } else {

            if(this.props.election.election_type === "1") {
              view = <NotVotedMotion {...this.props}/>
            } else if(this.props.election.election_type === "2") {
              view = <NotVotedSTV {...this.props}/>
            } else {
              view = <NotVoted {...this.props}/>
            }
            
          }
        }
      } else {
        view = <ObserverInfo/>
      }
    }

    componentWillMount() {
      this.changeView()
    }
  
    componentWillUpdate() {
      this.changeView()
    }

    render() {
        return (
          <div className="box has-text-centered">
            <Steps/>
            <div className="election">
              <h1 className="title">{this.props.election.name}</h1>
              <h2 className="subtitle-monospace">Election: 
              {this.props.election.voting_address}</h2>
            
            
              <StatusBar {...this.props}/>
              <br/>
              <div className="columns">
                <div className="column is-2">
                </div>

                <div className="column is-8">
                    <article className="message is-medium">
                        <div className="message-body">
                        The voting period will end in 
                        <br/>                    
                        <Timer endTime={this.props.election.v_end} moveNextStage={this.props.moveNextStage}/>
                        </div>
                    </article>
                </div>
                <div className="column is-2">
                </div>
              </div>
              <br/>
              <div className="is-divider"></div>
              <br/>
              {view}
            </div>
          </div>
        )
    }
}

export default StageVoting