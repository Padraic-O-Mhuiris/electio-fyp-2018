import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'
import ElectionItem from './electionItem'
class ElectionTable extends Component {

  render() {   
    return (

      <Menu pageWrapId={ "page-wrap" } 
            outerContainerId={ "outer-container" } 
            isOpen={ false } className="box" width={ 1000 }>
      
        <ElectionItem heading={"Administration"} data={this.props.admin_elections}/>
        <ElectionItem heading={"Your Elections"} data={this.props.user_elections}/>
        <ElectionItem heading={"Candidate Elections"} data={this.props.candidate_elections}/>
          
      </Menu>

    )
  }
}

export default ElectionTable
