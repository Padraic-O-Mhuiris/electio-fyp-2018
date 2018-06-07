import React, { Component } from 'react'
import '../../../../../node_modules/flatpickr/dist/themes/material_blue.css'
import {withRouter} from 'react-router-dom'
import helper from '../../../../helper'
import Flatpickr from 'react-flatpickr'

class CalendarReg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start_date: new Date(),
            end_date: new Date(),
            unix_start: null,
            unix_end: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleStart(start) {
        var u_start= new Date(start).getTime() / 1000
        this.setState({
            start_date: start,
            unix_start: u_start
        })
    }

    handleEnd(end) {
        var u_end= new Date(end).getTime() / 1000
        this.setState({
            end_date: end,
            unix_end: u_end
        })
    }

    async handleSubmit() {

        if(this.state.unix_start !== null && this.state.unix_end !== null) {
            var now = new Date().getTime() / 1000

            if(this.state.unix_start > now && this.state.unix_start < this.state.unix_end) {

                await helper.genKey(this.props.election.voting_address.toLowerCase())
                var pbk = await helper.getPBK(this.props.election.voting_address)
                this.startVoting(pbk)
            }
        }
    }

    async startVoting(pbk) {

        var func = async (receipt, num) => {
            this.props.renderOnTransaction(7, receipt, num)
        }

        this.props.voting.methods.start(
            this.state.unix_start, 
            this.state.unix_end,
            pbk.n,
            pbk.nSquared,
            pbk.g,
            pbk.bits
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

        this.props.history.push('/')
    }
    
    render() {
        const { start_date } = this.state;
        const { end_date } = this.state;

        return (
            <div className="columns">
                <div className="column is-2"></div>
                <div className="column is-8">

                <div className="box">
                    <div className="columns">
                        <div className="column is-6">
                        <h2 className="title-calendar">Select Voting Start</h2>
                        </div>
                        <div className="column is-6">
                        <Flatpickr data-enable-time
                                    options={{
                                        minDate: '2018-01-01',
                                    }}
                                    value={start_date}
                                    onChange={start_date => { this.handleStart(start_date) }}
                                    className="time-input" />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="box">
                    <div className="columns">
                        <div className="column is-6">
                        <h2 className="title-calendar">Select Voting Finish</h2>
                        </div>
                        <div className="column is-6">
                        <Flatpickr data-enable-time
                                    options={{
                                        minDate: '2018-01-01',
                                    }}
                                    value={end_date}
                                    onChange={end_date => { this.handleEnd(end_date) }}
                                    className="time-input" />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="has-text-centered">
                    <a className="button" onClick={this.handleSubmit}>Submit</a>
                </div>

                </div>
                <div className="column is-2"></div>
                                    
                

            
            </div>
        )
    }
}

export default withRouter(CalendarReg)