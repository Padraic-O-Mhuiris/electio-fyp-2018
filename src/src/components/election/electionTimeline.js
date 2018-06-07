import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'

class ElectionTimeline extends Component {
 
  render() {
    return (
        <div className="steps">
        <div className="step-item">
          <div className="step-marker">
          </div>
          <div className="step-details">
            <p className="step-title">Pre-Election</p>
            <p>The election has not started yet. You can register soon.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-marker"></div>
          <div className="step-details">
            <p className="step-title">Registration</p>
            <p>Registration is open</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-marker"></div>
          <div className="step-details">
            <p className="step-title">Pre-Voting</p>
            <p>Registration is closed, voting will begin soon</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-marker"></div>
          <div className="step-details">
            <p className="step-title">Voting</p>
            <p>Voting is now open</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-marker"></div>
          <div className="step-details">
            <p className="step-title">Post-Voting</p>
            <p>The Voting period is over, the votes can be tallied shortly</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-marker">
          </div>
          <div className="step-details">
            <p className="step-title">Tally Completed</p>
            <p>The Election is officially over, the votes can now be tallied</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ElectionTimeline
