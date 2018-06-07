import React, { Component } from 'react'

import Timer from '../../extras/timer'

class RegInfo extends Component {
  
      
  render() { 
    return (
        <div className="columns election">
            <div className="column is-2">
            </div>

            <div className="column is-8">
                <article className="message is-medium">
                    <div className="message-body">
                    The registration period will begin in 
                    <br/>                    
                    <Timer endTime={this.props.election.r_begin} moveNextStage={this.props.moveNextStage}/>
                    </div>
                </article>
            </div>

            <div className="column is-2">
            </div>
        </div>      
    )
    }
}

export default RegInfo

