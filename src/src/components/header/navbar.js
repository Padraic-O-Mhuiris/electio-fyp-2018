import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { NetIdHelper } from '../../helper'
import 'font-awesome/css/font-awesome.css'

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networkName: "",
    }
  }

  render() {
    return (
      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
          <p className="mono"><i className="fa fa-check-circle"></i> : {this.props.data.account}</p>
          <p className="mono"><i className="fa fa-cloud"></i> : {NetIdHelper(this.props.data.network)}</p>
          </div>
        </div>
        <div className="navbar-end">
          <NavLink to='/election-data' className="navbar-item" activeClassName="nav-active">
            Analytics
          </NavLink>
          <NavLink to='/admin' className="navbar-item" activeClassName="nav-active">
            Admin
          </NavLink>
        </div>
       
      </div>
    )
  }
}

export default NavBar;
