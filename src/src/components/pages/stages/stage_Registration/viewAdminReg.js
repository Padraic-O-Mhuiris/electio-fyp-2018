import React, { Component } from 'react'

import Table from '../../extras/table'
import CandidateList from './candidatesList'

const view = null
class ViewAdminReg extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            applied: [],
            valid: [],
            invalid: [],
            motion: ""
        }

        this.addMotion = this.addMotion.bind(this)
        this.validate = this.validate.bind(this)
        this.inValidate = this.inValidate.bind(this)
        this.handleMotion = this.handleMotion.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    async getAppliedVoters() {
        var num_applied_voters = (await this.props.registration.methods.getCounts().call())[0]
        var applied_voters = []
        var valid_voters = []
        var invalid_voters = []

        for(var i = 0; i < num_applied_voters; i++) {

            var applicant = await this.props.registration.methods.applicantVoters(i).call()
            var applicantChecks = await this.props.registration.methods.getVoterChecks(applicant).call()
            var isValid = await applicantChecks[2]
            var isChecked = await applicantChecks[1]
            
            if(isValid) {
                var timeChecked = (await this.props.registration.methods.getVoter(applicant).call())[4]
                var obj = {
                    "voter" : applicant,
                    "checked" : (new Date(timeChecked * 1000)) + ""
                }
                
                valid_voters.push(obj)
                continue;
            } else if(!isValid && isChecked) {
                var timeChecked = (await this.props.registration.methods.getVoter(applicant).call())[4]
                var obj = {
                    "voter" : applicant,
                    "checked" : (new Date(timeChecked * 1000)) + ""
                }
                invalid_voters.push(obj)
                continue;

            } else {
                var idcode = (await this.props.registration.methods.getVoter(applicant).call())[2]
                console.log(applicant)
                
                var obj = {
                    "applicant" : applicant,
                    "_id" : idcode,
                    "_valid" : <a className="button form" onClick={this.validate.bind(this, applicant, idcode)}>Validate</a>,
                    "_invalid" : <a className="button form" onClick={this.inValidate.bind(this, applicant)}>Invalidate</a>
                }

                applied_voters.push(obj)
                
            }
        }

        this.setState({
            applied: applied_voters,
            valid: valid_voters,
            invalid: invalid_voters
        })
    }

    handleMotion(event) {
        this.setState({
            motion: event.target.value
        })
    }

    handleSubmit(event) {
        if(this.props.metaMask.account === this.props.election.admin && this.state.motion !== "") {
            this.addMotion()
            this.setState({
                motion: ""
            })
        }
    }

    componentDidMount() {
        this.getAppliedVoters()
    }
    
    componentWillReceiveProps() {
        this.getAppliedVoters()
    }

    async addMotion() {
        var func = async (receipt, num) => {
            this.props.renderOnTransaction(10, receipt, num)
        }

        this.props.registration.methods.addMotion(
            this.state.motion
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
    }

    async validate(address, idcode) {
        var func = async (receipt, num) => {
            this.props.renderOnTransaction(4, receipt, num)
        }

        this.props.registration.methods.validateVoter(
            address,
            idcode
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
    }

    async inValidate(address) {

        var func = async (receipt, num) => {
            this.props.renderOnTransaction(5, receipt, num)
        }

        this.props.registration.methods.inValidateVoter(
            address
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
    }

    render() {
        console.log(this.state.motion)
        if(this.props.election.election_type === "1") {
            return (
                <div>
                    <div className="column is-12">

                        <div className="columns">
                            <div className="column is-4"></div>
                            <div className="column is-4">
                                <div className="field">
                                    
                                    <h2 className="subtitle">Add a Motion</h2>
                                    <div className="control">
                                        <textarea className="textarea" placeholder="e.g. My new motion" value={this.state.motion} onChange={this.handleMotion}></textarea>
                                    </div>
                                </div>
                                <br/>
                                <div className="has-text-centered">
                                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                                </div>
                                <br/>
                            </div>
                            <div className="column is-4"></div>
                        </div>
                        <br/>
                        <CandidateList {...this.props}/>
                        <br/>
                        <div className="box">
                            <h2 className="subtitle">Applied Voters</h2>
                            <Table
                                data={this.state.applied}
                                header={[
                                    {
                                        name: "Applicant",
                                        prop: "applicant"
                                    },
                                    {
                                        name: "ID",
                                        prop: "_id"
                                    },
                                    {
                                        name: "Validate",
                                        prop: "_valid"
                                    },
                                    {
                                        name: "Invalidate",
                                        prop: "_invalid"
                                    }

                                ]}
                            />
                        </div>
                        <br/>
                        <div className="box">
                            <h2 className="subtitle">Valid Voters</h2>
                            <Table
                                data={this.state.valid}
                                header={[
                                    {
                                        name: "Voter",
                                        prop: "voter"
                                    },
                                    {
                                        name: "Time Checked",
                                        prop: "checked"
                                    }
                                ]}
                            />
                        </div>
                        <br/>
                        <div className="box">
                            <h2 className="subtitle">Invalid Voters</h2>
                            <Table
                                data={this.state.invalid}
                                header={[
                                    {
                                        name: "Voter",
                                        prop: "voter"
                                    },
                                    {
                                        name: "Time Checked",
                                        prop: "checked"
                                    }
                                ]}
                            />
                        </div>
                    </div>                    
                </div>
            )
        } else {

            return (
                <div>
                    <div className="column is-12">
                        <div className="box">
                            <h2 className="subtitle">Applied Voters</h2>
                            <Table
                                data={this.state.applied}
                                header={[
                                    {
                                        name: "Applicant",
                                        prop: "applicant"
                                    },
                                    {
                                        name: "ID",
                                        prop: "_id"
                                    },
                                    {
                                        name: "Validate",
                                        prop: "_valid"
                                    },
                                    {
                                        name: "Invalidate",
                                        prop: "_invalid"
                                    }

                                ]}
                            />
                        </div>
                        <br/>
                        <div className="box">
                            <h2 className="subtitle">Valid Voters</h2>
                            <Table
                                data={this.state.valid}
                                header={[
                                    {
                                        name: "Voter",
                                        prop: "voter"
                                    },
                                    {
                                        name: "Time Checked",
                                        prop: "checked"
                                    }
                                ]}
                            />
                        </div>
                        <br/>
                        <div className="box">
                            <h2 className="subtitle">Invalid Voters</h2>
                            <Table
                                data={this.state.invalid}
                                header={[
                                    {
                                        name: "Voter",
                                        prop: "voter"
                                    },
                                    {
                                        name: "Time Checked",
                                        prop: "checked"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <br/>
                    <CandidateList {...this.props}/>
                </div>
            )
        }
    }
}


export default ViewAdminReg