import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import StatusBar from '../../extras/statusBar'
import Timer from '../../extras/timer'

import ViewVoterReg from './viewVoterReg'
import ViewAppliedVoter from './viewAppliedVoter'
import ViewCandidateReg from './viewCandidateReg'
import ViewAppliedCandidate from './viewAppliedCandidate'
import ViewAdminReg from './viewAdminReg'
import UserSwitch from './userSwitch'

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
    <div className="step-item is-active">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-map-marker"></i>
        </span>
      </div>
      <div className="step-details">
        <p className="step-title">Registration</p>
      </div>
    </div>
    <div className="step-item">
      <div className="step-marker"></div>
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
const view = null

class StageRegistration extends Component {
    constructor(props) {
      super(props);
      
      this.changeView = this.changeView.bind(this)
    }

    changeView(viewType) {
      
      if(this.props.election.admin === this.props.metaMask.account || this.props.election.status_voter.applied) {

        if(this.props.election.admin === this.props.metaMask.account) {

          view = <ViewAdminReg {...this.props}/>

        } else if(this.props.election.status_candidate.applied) {

            view = <ViewAppliedCandidate {...this.props}/>

        } else if(this.props.election.status_voter.applied) {

            view = <ViewAppliedVoter {...this.props}/>

        } else {
          view = <ViewVoterReg {...this.props}/>
        }
      } else {

        if(viewType === "candidate") {
          view = <ViewCandidateReg {...this.props}/>
        } else if(viewType === "voter") {
            view = <ViewVoterReg {...this.props}/>
        } else {
          view = <ViewVoterReg {...this.props}/>
        }
      }

      this.forceUpdate()
    }
    
    componentWillMount() {
      this.changeView(null)
    }
    
    componentWillReceiveProps() {
      this.changeView(null)
    }

    render() {
        return (
          <div className="box has-text-centered">
            <Steps/>
            <div className="election">
              <h1 className="title">Election: {this.props.election.voting_address}</h1>
              <h2 className="subtitle">{this.props.election.name}</h2>
            
            
              <StatusBar {...this.props}/>
              <br/>
              <div className="columns">
                <div className="column is-2">
                </div>

                <div className="column is-8">
                    <article className="message is-medium">
                        <div className="message-body">
                        The registration period will end in 
                        <br/>                    
                        <Timer endTime={this.props.election.r_end} moveNextStage={this.props.moveNextStage}/>
                        </div>
                    </article>
                </div>

                <div className="column is-2">
                </div>
              </div>
              <br/>
              <div className="is-divider"></div>
              <UserSwitch changeView={this.changeView} {...this.props}/>
              <br/>
              {view}
            </div>
          </div>
        )
    }
}

export default StageRegistration