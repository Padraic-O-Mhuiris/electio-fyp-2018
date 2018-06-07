import React, { Component } from 'react'
import CandidatesList from "./candidatesList" 
const time_applied = null
const time_checked = null
const checked = null
const valid = null

class ViewAppliedVoter extends Component {
    
    componentWillMount() {
        time_applied = new Date(this.props.election.status_voter.time_applied * 1000) + ""
        time_checked = new Date(this.props.election.status_voter.time_checked * 1000) + ""
        checked = this.props.election.status_voter.checked
        valid = this.props.election.status_voter.valid
    }
    
    componentWillReceiveProps() {
        time_applied = new Date(this.props.election.status_voter.time_applied * 1000) + ""
        time_checked = new Date(this.props.election.status_voter.time_checked * 1000) + ""
        checked = this.props.election.status_voter.checked
        valid = this.props.election.status_voter.valid
    }

    render() {
        if(valid === true) {
            return (
                <div>
                    <div className="columns">
                        <div className="column is-3"></div>
                        <div className="column is-6 has-text-centered">
                            <h2 className="subtitle">You are a valid voter in this election</h2>
                            <br/>
                            <div className="content">
                                <p> 
                                    The election administrator has verified you as a valid participant in this election. Please come back when the registration period is over and the voting stage has begun to submit your vote.
                                </p>
                            </div>
                            <br/>
                            <br/>
                            <p>The administrator validated your registration at :</p>
                            <h3>{time_checked}</h3>
                            <br/>
                            <p>You applied for this election at :</p>
                            <h3>{time_applied}</h3>
                        </div>
                        <div className="column is-3"></div>
                    </div>
                    <CandidatesList {...this.props}/>
                </div>
            )
        } 
        else if(checked === true) {
            return (
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column is-6 has-text-centered">
                        <h2 className="subtitle">You are NOT a valid voter</h2>
                        <br/>
                        <div className="content">
                            <p> 
                                The election administrator has deemed your registration information insufficient for this election.
                            </p>
                        </div>
                        <br/>
                        <p>The administrator invalidated your registration at :</p>
                        <h3>{time_checked}</h3>
                        <br/>
                        <p>You applied for this election at :</p>
                        <h3>{time_applied}</h3>
                    </div>
                    <div className="column is-3"></div>
                </div>
            )
        } else {
            return (
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column is-6 has-text-centered">
                        <h2 className="subtitle">You have applied for this election</h2>
                        <br/>
                        <div className="content">
                            <p> 
                                The administrator is in the process of verifying your identity and eligibility.
                            </p>
                        </div>
                        <br/>
                        <p>You applied for this election at :</p>
                        <br/>
                        <h3>{time_applied}</h3>
                    </div>
                    <div className="column is-3"></div>
                </div>

            )
        } 
    }
}

export default ViewAppliedVoter