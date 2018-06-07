import React, { Component } from 'react'

class ViewCandidateReg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            random: 0,
            fName: "",
            lName: ""
        };
        this.handleDummy = this.handleDummy.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandom = this.handleRandom.bind(this)
        this.handleFirstNameChange= this.handleFirstNameChange.bind(this)
        this.handleLastNameChange= this.handleLastNameChange.bind(this)
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

    handleFirstNameChange(event) {
        this.setState({
            fName: event.target.value
        })
    }

    handleLastNameChange(event) {
        this.setState({
            lName: event.target.value
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
            this.props.renderOnTransaction(3, receipt, num)
        }

        if(this.state.fName !== "" && this.state.lName !== "") {
            this.props.registration.methods.registerAsCandidate(
                this.state.random,
                this.state.fName,
                this.state.lName
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
        
    }

    render() {
        return (
        <div>

            <div className="columns">
                <div className="column is-3"></div>
                <div className="column is-6 has-text-centered">
                    <h1 className="title">Candidate Registration</h1>
                    <br/>
                    <div className="content">
                        <p> Register with your details for this election. Personal identifiable information is sent to the administrator
                            of the election. All that is publicly posted is your Ethereum account address and a random number to allow the 
                            administrator reference your address.

                            Register as a candidate for this election. Like all applicant voters, personal identifiable information is sent to the administrator
                            of the election. As a candidate, your name is published on the blockchain in this election as well as your administrative reference
                            number. If you have not registered as a voter than you will be registered as both a candidate and a voter.
                        </p>
                    </div>
                    <br/>
                </div>
                <div className="column is-3"></div>
            </div>
            <div className="columns">

                <div className="column is-1"></div>
                <div className="column is-4">
                    <div className="field">
                        <br/>
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input is-link" type="text" value={this.state.value} onChange={this.handleFirstNameChange}/>
                        </div>
                        <p className="help">Your name as on your birth certificate</p>
                    </div>

                    <div className="field">
                        <br/>
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input is-link" type="text" value={this.state.value} onChange={this.handleLastNameChange}/>
                        </div>
                        <p className="help">Your current address</p>
                    </div>
                </div>

                <div className="column is-2"></div>
                <div className="column is-4">

                    <div className="field">
                        <br/>
                        <label className="label">PPSN</label>
                        <div className="control">
                            <input className="input is-link" type="text" value={this.state.value} onChange={this.handleNumberChange}/>
                        </div>
                        <p className="help">Government Identification Number</p>
                    </div>

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

                <div className="column is-1"></div>
            </div>

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

export default ViewCandidateReg