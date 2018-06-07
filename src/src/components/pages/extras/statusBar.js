import React, { Component } from 'react'

const ElectionTypes = [
    "Plurality",
    "Motion",
    "Single Transferable Vote"
  ]

class StatusBar extends Component {
    
    render() {
        var sassID = "notification " + this.props.user
        return (
            <div className="columns statusbar">
            <div className="column is-4"></div>
            <div className="column is-4">
                <div className={sassID}>
                    <p>Election Status : {this.props.user}</p>
                    <p>----------------------------------------------------------------------</p>
                    <p>Electoral System : {ElectionTypes[this.props.election.election_type]}</p>
                </div>
            
            </div>
            <div className="column is-4"></div>
            </div>
        )
      }
  }
  
  export default StatusBar