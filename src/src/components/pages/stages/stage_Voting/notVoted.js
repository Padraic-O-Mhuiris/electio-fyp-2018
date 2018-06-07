import React, { Component } from 'react'

import helper from '../../../../helper'
import Table from "../../extras/table"

const VoteModal = (props) => (
    <div className={props.modal}>
            <div className="modal-background"></div>
            <div className="modal-content box">
            <div className="box">
                <p className="content">You are voting for:</p>
                <h2 className="subtitle">{props.selected.name}</h2>
                <div className="is-divider"></div>
                <h2 className="subtitle">Your Encrypted Vote</h2>
                <p className="vote-text">{props.vote}</p>
                <br/>
                <p>The above data is sent to the election contract as your vote. When you click the finalise vote button, your vote cannot be altered. If you wish to change your voting preference, please click the exit button in the top-right corner</p>
            </div>
            <br/>
            <div className="has-text-centered">
                <a className="button" onClick={props.finaliseVote}>Finalise Vote</a>
            </div>
            </div>
            <button className="modal-close is-large" onClick={props.close}aria-label="close"></button>
    </div>
  );

class NotVoted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            selected: {
                address: "",
                name: "",
                ptr: ""
            },
            modal: "modal",
            vote: "",
            submitted: false
        }

        this.getCandidates = this.getCandidates.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.modalOff = this.modalOff.bind(this)
        this.finaliseVote = this.finaliseVote.bind(this)
    }

    async handleVote(ptr, address, name) {

        var numVoters = await this.props.registration.methods.getNumVoters().call()
        var numeric = (await helper.calculateVoteNumeric(ptr, numVoters)).toString(2)

        var obj = {
            "address" : address,
            "name" : name,
            "numeric": numeric,
            "ptr" : ptr
        }

        this.setState({
            selected: obj
        })
    }

    async getCandidates() {
        
        var numCandidates = await this.props.election.candidates.length
        
        var _candidates = []
        for(var i = 0; i < numCandidates; i++) {
            var address = this.props.election.candidates[i].address
            var ptr = this.props.election.candidates[i].index
            var name = this.props.election.candidates[i].first_name + " " + this.props.election.candidates[i].last_name
            var vote = <a className="button form" onClick={this.handleVote.bind(this, ptr, address, name)}>Vote</a>

            var obj = {
                "ptr" : ptr,
                "name" : name,
                "address" : address,
                "_vote" : vote
            }

            _candidates.push(obj)
        }

        this.setState({
            candidates: _candidates
        })
        
    }

    finaliseVote() {
        var func = async (receipt, num) => {
            this.props.renderOnTransaction(8, receipt, num)
            if(this.state.submitted === false) {
                this.setState({
                    submitted: true
                })
            }
        }

        this.props.voting.methods.submitVote(
            this.state.vote
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

    modalOff() {

        if(!this.state.submitted) {
            this.setState({
                modal: "modal"
            })
        }
    }

    async handleSubmit() {

        if(this.state.selected.address != "") {
            var vote = await helper.encrypt(this.state.selected.numeric, this.props.election.public_key)

            this.setState({
                vote : vote,
                modal: "modal is-active"
            })
        }
    }

    componentDidMount() {
        this.getCandidates()
    }

    componentWillReceiveProps() {
        this.getCandidates()
    }

    render() {
        return (
            <div>
                <VoteModal close={this.modalOff} finaliseVote={this.finaliseVote} {...this.state}/>
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column is-6 has-text-centered">
                        <h2 className="subtitle">Submit Your Vote</h2>
                        <div className="content">
                            <p> 
                                This is a plurality election where each voter can select one candidate to vote for. The candidate with the highest number of votes wins!
                            </p>
                        </div>
                    </div>
                    <div className="column is-3"></div>
                </div>
                <Table
                    data={this.state.candidates}
                    header={[
                        {
                            name: "Candidate Number",
                            prop: "ptr"
                        },
                        {
                            name: "Candidate Name",
                            prop: "name"
                        },
                        {
                            name: "Candidate Address",
                            prop: "address"
                        },
                        {
                            name: "Select",
                            prop: "_vote"
                        }
                    ]}
                />
                <div className="columns">
                    <div className="column is-2"></div>

                    <div className="column is-8">
                        <article className="message is-medium">
                            <div className="message-header">
                                <p>Your Vote</p>
                            </div>  
                            <div className="message-body">
                                <p className="content">{this.props.election.name}</p>
                                <h2 className="subtitle">{this.state.selected.name}</h2>
                                <br/>
                            </div>
                        </article>
                    </div>

                    <div className="column is-2"></div>
                </div>
                <div className="has-text-centered">
                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                </div>
            </div>
        )
        
    }
}

export default NotVoted