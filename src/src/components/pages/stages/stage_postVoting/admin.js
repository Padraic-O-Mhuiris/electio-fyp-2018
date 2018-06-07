import React, { Component } from 'react'
import VotesTable from '../stage_Voting/votesTable';
import helper from '../../../../helper'

class Admin extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    
    async handleSubmit() {

        var pvk = await helper.getPVK(this.props.election.voting_address.toLowerCase())
        console.log(pvk)

        var func = async (receipt, num) => {
            this.props.renderOnTransaction(7, receipt, num)
        }

        this.props.voting.methods.publishPrivateKey(
            pvk.lambda,
            pvk.denom
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
        return (
            <div>
                <br/>
                <div className="columns">
                    <div className="column is-4"></div>
                    <div className="column is-4">
                        <div className="has-text-centered">
                            <p>Submit the election keys to the contract. Once added, every voter can calculate the results of the election</p>
                            <br/>
                            <a className="button" onClick={this.handleSubmit}>Publish Election Keys</a>
                        </div>
                    </div>
                    <div className="column is-4"></div>
                </div>
                <br/>
                <VotesTable {...this.props}/>
            </div>
        )
    }
}

export default Admin