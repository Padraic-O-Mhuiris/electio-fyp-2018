import React, { Component } from 'react'

import Timer from '../../extras/timer'
import CandidateList from '../stage_Registration/candidatesList'

class ElectionInfo extends Component {
  
  render() { 
    return (
        <div>
            <div className="columns">
                <div className="column is-2">
                </div>

                <div className="column is-8">
                    <article className="message is-medium">
                        <div className="message-body">
                        The voting period will begin in 
                        <br/>                    
                        <Timer endTime={this.props.election.v_begin} moveNextStage={this.props.moveNextStage}/>
                        </div>
                    </article>
                </div>

                <div className="column is-2">
                </div>
            </div>
            <CandidateList {...this.props}/>
        </div>
        
    )
    }
}

export default ElectionInfo

