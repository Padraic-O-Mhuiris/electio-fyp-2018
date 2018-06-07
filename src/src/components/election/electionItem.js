import React, { Component } from 'react'

class ElectionItem extends Component {

  render() {

    if(this.props.data.length !== 0) {
      return (
        <div className="box menu-item">
          <h1 className="title">{this.props.heading}</h1>
          <ul>
            {
              this.props.data.map((address, i) => <li key={i}>{address}</li>)
            }
          </ul>
        </div>
      ) 
    } else {
      return(<div></div>)
    }
    
  }
}

export default ElectionItem