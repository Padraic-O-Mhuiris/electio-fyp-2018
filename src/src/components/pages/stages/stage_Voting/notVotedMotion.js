import React, { Component } from 'react'

import helper from '../../../../helper'
import Table from "../../extras/table"

const VoteModal = (props) => (
    <div className={props.modal}>
            <div className="modal-background"></div>
            <div className="modal-content box">
            <div className="box">
                <p className="content">You are voting for:</p>
                <h2 className="subtitle">{props.selected.motion}</h2>
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
            motions: [],
            selected: {
                motion: "",
            },
            modal: "modal",
            vote: "",
            submitted: false
        }

        this.getMotions = this.getMotions.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.modalOff = this.modalOff.bind(this)
        this.finaliseVote = this.finaliseVote.bind(this)
    }

    async handleVote(ptr, motion) {

        var numVoters = await this.props.registration.methods.getNumVoters().call()
        var numeric = (await helper.calculateVoteNumeric(ptr, numVoters)).toString(2)

        var obj = {
            "motion": motion,
            "numeric": numeric,
            "ptr" : ptr
        }

        this.setState({
            selected: obj
        })
    }

    async getMotions() {
        
        var numMotions = (await this.props.registration.methods.getCounts().call())[5]
        
        var _motions = []
        for(var i = 0; i < numMotions; i++) {

            var ptr = i

            var motion = await this.props.registration.methods.motions(i).call()
            var vote = <a className="button form" onClick={this.handleVote.bind(this, ptr, motion)}>Vote</a>

            var obj = {
                "ptr" : ptr,
                "motion" : motion,
                "_vote" : vote
            }

            _motions.push(obj)
        }

        this.setState({
            motions: _motions
        })
        
    }

    finaliseVote() {
        var func = async (receipt, num) => {
            this.props.renderOnTransaction(8, receipt, num)
        }

        this.props.voting.methods.submitVote(
            this.state.vote
        ).send({from: this.props.metaMask.account}
        ).on('transactionHash', function(hash){
            console.log("Hash")
            console.log(hash)
            this.setState({
                submitted: true
            })
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
        this.getMotions()
    }

    componentWillReceiveProps() {
        this.getMotions()
    }

    componentWillUnmount() {
        this.setState({
            motions: [],
            selected: {
                motion: "",
            },
            modal: "modal",
            vote: "",
            submitted: false
        })
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
                                This is a motion election where each voter can select a motion to vote for. The motion with the highest number of votes wins!
                            </p>
                        </div>
                    </div>
                    <div className="column is-3"></div>
                </div>
                <Table
                    data={this.state.motions}
                    header={[
                        {
                            name: "Motion Number",
                            prop: "ptr"
                        },
                        {
                            name: "Motion",
                            prop: "motion"
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
                                <h2 className="subtitle">{this.state.selected.motion}</h2>
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