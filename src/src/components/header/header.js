import React, { Component } from 'react'

import Logo from './logo'
import NavBar from './navbar'

class Header extends Component {
  render() {
    return (
      <section className="section header">
        <nav className="navbar is-fixed-top title-bar ">
          <div className="container">
            <Logo />
            <NavBar data={this.props.data}/>
          </div>
        </nav>
      </section>
    )
  }
}

export default Header
