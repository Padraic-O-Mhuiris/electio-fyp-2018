import React, { Component } from 'react'

import helper from '../../../../helper'
import Table from "../../extras/table"
import 'font-awesome/css/font-awesome.css'

const VoteModal = (props) => (
    <div className={props.modal}>
            <div className="modal-background"></div>
            <div className="modal-content box">
            <div className="box">
                <p className="content">You are voting for:</p>
                <Table
                    data={props.selected}
                    header={[
                        {
                            name: "Preference",
                            prop: "pref"
                        },
                        {
                            name: "Candidate Name",
                            prop: "name"
                        }
                    ]}
                />
                <div className="is-divider"></div>
                <h2 className="subtitle">Your Encrypted Vote</h2>
                <p className="vote-text">{props.vote}</p>
                <br/>
                <p>The above data is sent to the election contract as your vote. When you execute the transaction using your metamask wallet, your vote cannot be altered. If you wish to change your voting preference, please click the exit button in the top-right corner</p>
            </div>
            <br/>
            <div className="has-text-centered">
                <a className="button" onClick={props.finaliseVote}>Finalise Vote</a>
            </div>
            </div>
            <button className="modal-close is-large" onClick={props.close}aria-label="close"></button>
    </div>
  );

class NotVotedSTV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            selected: [],
            modal: "modal",
            numeric: null,
            vote: "",
            submitted: false
        }

        this.getCandidates = this.getCandidates.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.modalOff = this.modalOff.bind(this)
        this.finaliseVote = this.finaliseVote.bind(this)
        this.removePreference = this.removePreference.bind(this)
    }

    async removePreference(index) {
        var arr = this.state.selected

        if(arr.length === 1) {
            arr = []
        } else {
            arr.splice(index, 1)
            for(var i = 0; i < arr.length; i++) {
                arr[i].pref = i + 1
                arr[i]._remove = <a className="button form" onClick={this.removePreference.bind(this, i)}><i className="fa fa-trash"></i></a>
            }
        }

        
        var choices = []
        for(var i = 0; i < arr.length; i++) {
            choices.push(parseInt(arr[i].ptr))
        }
        var _numeric = helper.calculateSTVNumeric(choices)
        this.setState({
            selected: arr,
            numeric: _numeric
        })

        this.getCandidates()
    }

    async handleVote(ptr, address, name) {

        var obj = {
            "address" : address,
            "name" : name,
            "ptr" : ptr,
            "pref" : this.state.selected.length + 1,
            "_remove" : <a className="button form" onClick={this.removePreference.bind(this, this.state.selected.length)}><i className="fa fa-trash"></i></a>
        }

        var arr = this.state.selected
        arr.push(obj)
        var choices = []
        for(var i = 0; i < arr.length; i++) {
            choices.push(parseInt(arr[i].ptr))
        }
        var _numeric = helper.calculateSTVNumeric(choices)
        this.setState({
            selected: arr,
            candidates: [],
            numeric: _numeric
        })

        this.getCandidates()
    }

    async getCandidates() {
        
        var numCandidates = await this.props.election.candidates.length
        
        var _candidates = []
        for(var i = 0; i < numCandidates; i++) {
            var checker = false
            for(var j = 0; j < this.state.selected.length; j++) {
                if(this.props.election.candidates[i].index === this.state.selected[j].ptr) {
                    checker = true
                    break
                }
            }

            if(checker) {
                continue
            }

            var address = this.props.election.candidates[i].address
            var ptr = this.props.election.candidates[i].index
            var name = this.props.election.candidates[i].first_name + " " + this.props.election.candidates[i].last_name
            var vote = <a className="button form" onClick={this.handleVote.bind(this, ptr, address, name)}>{this.state.selected.length + 1}</a>

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
        }

        this.setState({
            submitted: true
        })

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

        if(this.state.selected.length > 0) {
            var vote = await helper.encrypt(this.state.numeric.toString(2), this.props.election.public_key)

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
                                This is a single transferable vote election. To submit your vote you must
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
                            name: "Preference",
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
                                <Table
                                    data={this.state.selected}
                                    header={[
                                        {
                                            name: "Preference",
                                            prop: "pref"
                                        },
                                        {
                                            name: "Candidate Name",
                                            prop: "name"
                                        },
                                        {
                                            name: "Candidate Number",
                                            prop: "ptr"
                                        },
                                        {
                                            name: "",
                                            prop: "_remove"
                                        }
                                    ]}
                                />
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

export default NotVotedSTV