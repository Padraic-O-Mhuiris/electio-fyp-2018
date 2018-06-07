import React, { Component } from 'react'
import ElectionTimeline from '../election/electionTimeline'

import StagePreElection from './stages/stage_preElection/stage_preElection'
import StageRegistration from './stages/stage_Registration/stage_Registration'
import StagePreVoting from './stages/stage_preVoting/stage_preVoting'
import StageVoting from './stages/stage_Voting/stage_Voting'
import StagePostVoting from './stages/stage_postVoting/stage_postVoting'
import StageTally from './stages/stage_Tally/stage_Tally'
import HomePage from './homepage'
const helper = require('../../helper')

class Landing extends Component {
  
  render() {
    switch(this.props.election.stage) {
      case 0: 
        return (<HomePage/>)
      case 1: 
        return (<div className="column is-12"><StagePreElection {...this.props}/></div>)
      case 2: 
        return (<div className="column is-12"><StageRegistration {...this.props}/></div>)
      case 3: 
        return (<div className="column is-12"><StagePreVoting {...this.props}/></div>)
      case 4:
        return (<div className="column is-12"><StageVoting {...this.props}/></div>)
      case 5:
        return (<div className="column is-12"><StagePostVoting {...this.props}/></div>)
      case 6:
        return (<div className="column is-12"><StageTally {...this.props}/></div>)
      default:
        return (<HomePage/>)
    } 
  }
}

export default Landing
