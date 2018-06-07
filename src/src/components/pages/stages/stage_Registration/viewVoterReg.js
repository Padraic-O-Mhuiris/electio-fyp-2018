import React, { Component } from 'react'

class ViewVoterReg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            random: 0
        };
        this.handleDummy = this.handleDummy.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandom = this.handleRandom.bind(this)
    }

    handleDummy(event) {
        
    }

    handleRandom() {
        const min = 1;
        const max = 1000000000000000;
        const rand = Math.floor(min + Math.random() * (max - min));

        this.setState({
            random: rand
        })   
    }

    componentWillMount() {
        this.handleRandom()
        this.handleRandom()
    }

    handleSubmit() {
       this.registerAsVoter()
    }

    async registerAsVoter() {

        var func = async (receipt, num) => {
            this.props.renderOnTransaction(2, receipt, num)
        }

        this.props.registration.methods.registerAsVoter(
            this.state.random
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
        console.log(this.state.random)

        return (
        <div>

            <div className="columns">
                <div className="column is-3"></div>
                <div className="column is-6 has-text-centered">
                    <h1 className="title">Voter Registration</h1>
                    <br/>
                    <div className="content">
                        <p> Register with your details for this election. Personal identifiable information is sent to the administrator
                            of the election. All that is publicly posted is your Ethereum account address and a random number to allow the 
                            administrator reference your address.
                        </p>
                    </div>
                    <br/>
                </div>
                <div className="column is-3"></div>
            </div>
            <div className="columns">

                <div className="column is-4"></div>
                <div className="column is-4">
                    <div className="field">
                        <br/>
                        <label className="label">Election ID</label>
                        <div className="control">
                            <input className="input is-link" 
                                type="text" 
                                value={this.state.random}
                                onChange={this.handleDummy}
                                />
                        </div>
                        <a className="button form" onClick={this.handleRandom}>Randomise</a>
                    </div>                    
                </div>
                <div className="column is-4"></div>
            </div>
            <br/>
            <div className="columns">
                <div className="column is-4"></div>
                <div className="column is-4">
                    <div className="has-text-centered">
                        <a className="button" onClick={this.handleSubmit}>Submit</a>
                    </div>
                </div>
                <div className="column is-4"></div>
            </div>
        </div>
        )
    }
}

export default ViewVoterReg