import React, { Component } from 'react'
import Table from "../../extras/table"

function ItemList(props) {
    const items = props.items;
    const listItems = items.map((item) =>
      <li key={item.toString()}>
        {item}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

const NoNomVoter = (props) => (

    <div className="column is-12">
        <div className="box">
            <p>As you are a valid voter, you can nominate an applied candidate</p>
            <h2 className="subtitle">Applied Candidates</h2>
            <Table
                data={props.appliedCandidates}
                header={[
                    {
                        name: "Candidate Name",
                        prop: "name"
                    },
                    {
                        name: "Candidate Address",
                        prop: "address"
                    },
                    {
                        name: "Nominations",
                        prop: "nominations"
                    },
                    {
                        name: "Nominators",
                        prop: "nominators"
                    },
                    {
                        name: "Nom Timestamps",
                        prop: "nomination_timestamp"
                    },
                    {
                        name: "Nominate",
                        prop: "_nominate"
                    },
                ]}
            />
        </div>
        <br/>
        <div className="box">
            <h2 className="subtitle">Valid Candidates</h2>
            <Table
                data={props.validCandidates}
                header={[
                    {
                        name: "Candidate Name",
                        prop: "name"
                    },
                    {
                        name: "Candidate Address",
                        prop: "address"
                    },
                    {
                        name: "Nominations",
                        prop: "nominations"
                    },
                    {
                        name: "Nominators",
                        prop: "nominators"
                    },
                    {
                        name: "Nom Timestamps",
                        prop: "nomination_timestamp"
                    }
                ]}
            />
        </div>
    </div>
)

const NomVoter = (props) => (

    <div className="column is-12">
        <div className="box">
            <p>{props.msg}</p>
            <h2 className="subtitle">Applied Candidates</h2>
            <Table
                data={props.appliedCandidates}
                header={[
                    {
                        name: "Candidate Name",
                        prop: "name"
                    },
                    {
                        name: "Candidate Address",
                        prop: "address"
                    },
                    {
                        name: "Nominations",
                        prop: "nominations"
                    },
                    {
                        name: "Nominators",
                        prop: "nominators"
                    },
                    {
                        name: "Nom Timestamps",
                        prop: "nomination_timestamp"
                    }
                ]}
            />
        </div>
        <br/>
        <div className="box">
            <h2 className="subtitle">Valid Candidates</h2>
            <Table
                data={props.validCandidates}
                header={[
                    {
                        name: "Candidate Name",
                        prop: "name"
                    },
                    {
                        name: "Candidate Address",
                        prop: "address"
                    },
                    {
                        name: "Nominations",
                        prop: "nominations"
                    },
                    {
                        name: "Nominators",
                        prop: "nominators"
                    },
                    {
                        name: "Nom Timestamps",
                        prop: "nomination_timestamp"
                    },
                ]}
            />
        </div>
    </div>
)

const MotionsList = (props) => (

    <div className="column is-12">
        <div className="box">
            <p>{props.msg}</p>
            <h2 className="subtitle">Election Motions</h2>
            <Table
                data={props.motions}
                header={[
                    {
                        name: "Motions",
                        prop: "motion"
                    },
                ]}
            />
        </div>
    </div>
)

class CandidateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appliedCandidates: [],
            validCandidates: [],
            motions: []
        }
        this.getCandidates = this.getCandidates.bind(this)
        this.getMotions = this.getMotions.bind(this)
        this.nominate = this.nominate.bind(this)
    }

    async nominate(address) {
        var func = async (receipt, num) => {
            this.props.renderOnTransaction(6, receipt, num)
        }

        this.props.registration.methods.nominateCandidate(
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

    async getCandidates() {
        
        var numCandApplied = (await this.props.registration.methods.getCounts().call())[1]
        var _appliedCandidates = []
        var _validCandidates = []

        for(var i = 0; i < numCandApplied; i++) {
            var candidateAddress = await this.props.registration.methods.applicantCandidates(i).call()
            var candidate = await this.props.registration.methods.getCandidate(candidateAddress).call()
            var candidateName = await this.props.registration.methods.getCandidateName(candidateAddress).call()
            var nomLimit = await this.props.registration.methods.nominationLimit().call()

            var times = []
            for(var j = 0; j < candidate[2].length; j++) {
                var newTime = new Date(candidate[2][j] * 1000) + ""
                times.push(newTime)
            }

            var obj;

            if(candidate[5]) {

                obj = {
                    "name" : candidateName[0] + " " + candidateName[1],
                    "address" : candidateAddress,
                    "nominations" : candidate[1].length + "/" + nomLimit,
                    "nominators" : <ItemList items={candidate[1]}/>,
                    "nomination_timestamp": <ItemList items={times}/>
                }

                _validCandidates.push(obj)

            } else {

                if(this.props.election.status_voter.nominated === null && !this.props.election.status_candidate.applied) {

                    obj = {
                        "name" : candidateName[0] + " " + candidateName[1],
                        "address" : candidateAddress,
                        "nominations" : candidate[1].length + "/" + nomLimit,
                        "nominators" : <ItemList items={candidate[1]}/>,
                        "nomination_timestamp": <ItemList items={times}/>,
                        "_nominate" : <a className="button form" onClick={this.nominate.bind(this, candidateAddress)}>Nominate</a>
                    }

                } else {

                    obj = {
                        "name" : candidateName[0] + " " + candidateName[1],
                        "address" : candidateAddress,
                        "nominations" : candidate[1].length + "/" + nomLimit,
                        "nominators" : <ItemList items={candidate[1]}/>,
                        "nomination_timestamp": <ItemList items={times}/>
                    }
                }
                
                _appliedCandidates.push(obj)
            }
        }

        this.setState({
            appliedCandidates: _appliedCandidates,
            validCandidates: _validCandidates
        })
    }

    async getMotions() {
        var numMotions = (await this.props.registration.methods.getCounts().call())[5]
        var _motions = []
        for(var i = 0; i < numMotions; i++) {
            var obj = {
                "motion" : await this.props.registration.methods.motions(i).call()
            }
            _motions.push(obj)
        }

        this.setState({
            motions: _motions
        })
    }

    componentDidMount() {

        if(this.props.election.election_type === "1") {
            this.getMotions()
        } else {
            this.getCandidates()
        }
        
    }

    componentWillReceiveProps() {

        if(this.props.election.election_type === "1") {
            this.getMotions()
        } else {
            this.getCandidates()
        }

    }
    
    render() {

        var msgVoter = "You have nominated : " + this.props.election.status_voter.nominated
        var msgCandidate = "Candidates are unable to nominate in this election"

        if(this.props.election.election_type === "1") {
            return (
                <MotionsList msg={""} {...this.state}/>
            )
        } else {
            if(this.props.metaMask.account === this.props.election.admin) {
                return (
                    <NomVoter msg={""} {...this.state}/>
                )
            } else if(this.props.election.status_voter.nominated === null && !this.props.election.status_candidate.applied) {
                return (
                    <NoNomVoter {...this.state}/>
                )
            } else if(this.props.election.status_candidate.applied){
                return (
                    <NomVoter msg={msgCandidate} {...this.state}/>
                ) 
            } else {
                return (
                    <NomVoter msg={msgVoter} {...this.state}/>
                )
            }
        }       
    }
  }
  
  export default CandidateList