import React, { Component } from 'react'

import CandidatesList from "./candidatesList" 

class ViewAppliedCandidate extends Component {
    
    render() {
        
        if(this.props.election.status_candidate.valid) {

            return (
                <div>
                    <div className="columns">
                        <div className="column is-3"></div>
                        <div className="column is-6 has-text-centered">
                            <h2 className="subtitle">You are a valid candidate in this election</h2>
                            <br/>
                            <div className="content">
                                <p> 
                                    You have received enough nominations from valid voters to permit you as a valid candidate.
                                </p>
                            </div>
                            <br/>
                        </div>
                        <div className="column is-3"></div>
                    </div>
                    <CandidatesList {...this.props}/>
                </div>
            )
            
        } else {

            return (
                <div>
                    <div className="columns">
                        <div className="column is-3"></div>
                        <div className="column is-6 has-text-centered">
                            <h2 className="subtitle">You are an applied candidate in this election</h2>
                            <br/>
                            <div className="content">
                                <p> 
                                    You have not received enough nominations from valid voters yet to permit you as a valid candidate.
                                </p>
                            </div>
                            <br/>                            
                        </div>
                        <div className="column is-3"></div>
                    </div>
                    <CandidatesList {...this.props}/>
                </div>
            )
        }
        
       
    }
}

export default ViewAppliedCandidate