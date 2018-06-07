import React, { Component } from 'react'

import 'font-awesome/css/font-awesome.css'
import StatusBar from '../../extras/statusBar'
import Admin from './admin'
import VotesTable from '../stage_Voting/votesTable';

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
    <div className="step-item is-active">
      <div className="step-marker">
        <span className="icon">
            <i className="fa fa-map-marker"></i>
        </span>
      </div>
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

const WaitingInfo = (props) => (
  <div>
    <div className="columns">
      <div className="column is-2">
      </div>
      <div className="column is-8">
        <article className="message is-medium">
          <div className="message-body">
            The administrator is validating the election. Please come back in a few minutes!
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

class StagePostVoting extends Component {

  changeView() {

    if(this.props.metaMask.account === this.props.election.admin) {
      view = (<Admin {...this.props}/>)

    } else {
      view = <WaitingInfo {...this.props}/>
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

export default StagePostVoting