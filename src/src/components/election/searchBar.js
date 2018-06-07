import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import 'font-awesome/css/font-awesome.css'

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            redirect: false,
            registration: null,
            voting: null
        };
        this.handleAddress= this.handleAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
    }

    handleAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    async handleSubmit() {
        
        if(this.props.web3.utils.isAddress(this.state.address)) {
            
            var isElection = await this.props.deployer.methods.isElection(this.state.address).call()
            if(isElection) {
                this.props.handleElectionStage(0)
                this.props.setElection(this.state.address)
                this.props.history.push('/')
            } else {
                console.log("Not an election")
            }
        }
    }

    render() {
        return (
            <div className="column is-one-third">
                <div className="box search">
                    <div className="field is-grouped">
                    <p className="control is-expanded">
                        <input  className="input is-rounded" 
                                type="text"
                                placeholder="0x0" 
                                value={this.state.value}
                                onChange={this.handleAddress}/>
                    </p>
                    <p className="control">
                        <a className="button"
                            onClick={this.handleSubmit}>
                        <i className="fa fa-search"></i> &nbsp; Find an Election
                        </a>
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar)

