import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

const ElectionTypes = {
    "plurality" : 0,
    "motion"    : 1,
    "stv"       : 2
}

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: 0,
            type: ElectionTypes.plurality,
            seats: 0
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSeatsChange = this.handleSeatsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleType = this.handleType.bind(this)
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleNumberChange(event) {
        this.setState({
            number: parseInt(event.target.value, 10)
        });
    }

    handleSeatsChange(event) {
        this.setState({
            seats: parseInt(event.target.value, 10)
        })
    }

    handleType(event) {
        let num = parseInt(event.target.value, 10)
        this.setState({
            number: 0,
            seats: 0
        })
        switch(num) {
            case 0:
                this.setState({
                    type: ElectionTypes.plurality
                })
                break;
            case 1:
                this.setState({
                    type: ElectionTypes.motion
                })
                break;
            case 2:
                this.setState({
                    type: ElectionTypes.stv
                })
                break;
            default:
                this.setState({
                    type: ElectionTypes.plurality
                })
        }
    }

    handleSubmit(event) {

        if(this.state.name !== '' && !isNaN(this.state.number) && !isNaN(this.state.seats)) {
            this.submitElection()
        }
    }  

    async submitElection() {

        var func = async (receipt, num) => {
            this.props.renderOnTransaction(0, receipt, num)
        }

        this.props.deployer.methods.newElection(
            this.state.name, 
            this.state.number,
            this.state.type,
            this.state.seats
        ).send({from: this.props.metaMask.account}
        ).on('transactionHash', function(hash){
            console.log("Hash")
            console.log(hash)
        })
        .on('receipt', function(receipt){
            console.log("Receipt")
            console.log(receipt)
        })
        .on('confirmation', async function(confirmationNumber, receipt){
            func(receipt, confirmationNumber)
        })

        this.props.history.push('/election-data')
    }

    sleep(s) {
        var ms = s * 1000
        console.log("Sleeping for " + s + " seconds")
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        console.log(this.state)
        if(this.state.type === ElectionTypes.motion) {
            return (
                <div className="column is-12">
                    <div className="box has-text-centered">
                        <div className="admin">
                        <div className="columns">
                            <div className="column is-4"></div>
                            <div className="column is-4">
                                <h1 className="title has-text-centered">Election Administration</h1>
                                <h2 className="subtitle has-text-centered">Generate Your Election Here</h2>
                                <br/>
                                <div className="field">
                                    
                                    <label className="label">Election Name</label>
                                    <div className="control">
                                        <input className="input is-link" type="text" value={this.state.value} onChange={this.handleNameChange}/>
                                    </div>
                                    <p className="help">Keep name short and concise</p>
                                </div>

                                <div className="field">
                                    <br/>
                                    <label className="label">Election Type</label>
                                    <div className="control dropdown">
                                        <div className="select">
                                        <select onChange={this.handleType} value={this.state.type}>
                                            <option value="0">Plurality</option>
                                            <option value="1">Motion</option>
                                            <option value="2">Single Transferable Vote</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="has-text-centered">
                                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                                </div>
                            </div>
                            <div className="column is-4"></div>

                        </div>
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.type === ElectionTypes.stv) {
            return (
                <div className="column is-12">
                    <div className="box has-text-centered">
                        <div className="admin">
                        <div className="columns">
                            <div className="column is-4"></div>
                            <div className="column is-4">
                                <h1 className="title has-text-centered">Election Administration</h1>
                                <h2 className="subtitle has-text-centered">Generate Your Election Here</h2>
                                <br/>

                                <div className="field">
                                    <label className="label">Election Name</label>
                                    <div className="control">
                                        <input className="input is-link" type="text" value={this.state.value} onChange={this.handleNameChange}/>
                                    </div>
                                    <p className="help">Keep name short and concise</p>
                                </div>

                                <div className="field">
                                    <br/>
                                    <label className="label">Nomination limit</label>
                                    <div className="control">
                                        <input className="input is-link" type="number" value={this.state.value} onChange={this.handleNumberChange}/>
                                    </div>
                                    <p className="help">Number of nominations each candidate needs</p>
                                </div>

                                <div className="field">
                                    <br/>
                                    <label className="label">Number of Seats</label>
                                    <div className="control">
                                        <input className="input is-link" type="number" value={this.state.value} onChange={this.handleSeatsChange}/>
                                    </div>
                                    <p className="help">Number of seats to be filled</p>
                                </div>

                                <div className="field">
                                    <br/>
                                    <label className="label">Election Type</label>
                                    <div className="control dropdown">
                                        <div className="select">
                                            <select onChange={this.handleType} value={this.state.type}>
                                                <option value="0">Plurality</option>
                                                <option value="1">Motion</option>
                                                <option value="2">Single Transferable Vote</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="has-text-centered">
                                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                                </div>
                            </div>
                            <div className="column is-4"></div>

                        </div>
                        </div>
                    </div>
                </div>
            )
        } else {      
            return (
                <div className="column is-12">
                    <div className="box has-text-centered">
                        <div className="admin">
                        <div className="columns">
                            <div className="column is-4"></div>
                            <div className="column is-4">
                                <h1 className="title has-text-centered">Election Administration</h1>
                                <h2 className="subtitle has-text-centered">Generate Your Election Here</h2>
                                <br/>
                                <div className="field">
                                    
                                    <label className="label">Election Name</label>
                                    <div className="control">
                                        <input className="input is-link" type="text" value={this.state.value} onChange={this.handleNameChange}/>
                                    </div>
                                    <p className="help">Keep name short and concise</p>
                                </div>

                                <div className="field">
                                    <br/>
                                    <label className="label">Nomination limit</label>
                                    <div className="control">
                                        <input className="input is-link" type="number" value={this.state.value} onChange={this.handleNumberChange}/>
                                    </div>
                                    <p className="help">Number of nominations each candidate needs</p>
                                </div>

                                <div className="field">
                                <br/>
                                <label className="label">Election Type</label>
                                <div className="control dropdown">
                                    <div className="select">
                                    <select onChange={this.handleType} value={this.state.type}>
                                        <option value="0">Plurality</option>
                                        <option value="1">Motion</option>
                                        <option value="2">Single Transferable Vote</option>
                                    </select>
                                    </div>
                                </div>
                                </div>

                                <br/>
                                <div className="has-text-centered">
                                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                                </div>
                            </div>
                            <div className="column is-4"></div>

                        </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Admin)