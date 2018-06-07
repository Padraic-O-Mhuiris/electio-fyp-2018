import React, { Component } from 'react'

import Header from './components/header/header'
import Landing from './components/pages/landing'
import Analytics from './components/pages/analytics/analytics'
import Admin from './components/pages/admin/admin'
import ElectionTable from './components/election/electionTable'
import SearchBar from './components/election/searchBar'
import MetaMask from './components/metamask/metamask'

import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const DeployerContractAddress = "0xcc06b036300e369aebcb9a53119839a626d84213"


const DeployerABI = require("../build/contracts/Deployer.json")
const RegistrationABI = require("../build/contracts/Registration.json")
const VotingABI = require("../build/contracts/Voting.json")

const helper = require('./helper')
const ElectionTypes = [
  "Plurality",
  "Motion",
  "Single Transferable Vote"
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      deployer: null,
      registration: null,
      voting: null,
      user: null,
      checks: {
        loaded_election: false,
        all_elections: false,
        self_elections: false,
        loaded_web3: false,
        loaded_deployer: false,
      }
    };
    this.setWeb3 = this.setWeb3.bind(this);
    this.resetChecks = this.resetChecks.bind(this)
    this.setElection = this.setElection.bind(this)
    this.renderOnTransaction = this.renderOnTransaction.bind(this)
    this.setCurrentElectionStage = this.setCurrentElectionStage.bind(this)
  }
  
  setWeb3(web3) {
    var deployer = new web3.eth.Contract(DeployerABI.abi, DeployerContractAddress) 

    this.setState({
      web3: web3,
      deployer: deployer,
      checks: {
        loaded_election: this.state.checks.loaded_election,
        all_elections: this.state.checks.all_elections,
        self_elections: this.state.checks.self_elections,
        loaded_web3: true,
        loaded_deployer: true,
      }
    });

    this.getElections()
    this.forceUpdate()
  }

  resetChecks() {
    this.setState({
      checks: {
        loaded_election: false,
        all_elections: this.state.checks.all_elections,
        self_elections: false,
        loaded_web3: this.state.checks.loaded_web3,
        loaded_deployer: this.state.checks.loaded_deployer,
      }
    })
  }

  async setElection(address) {
    var election = await this.state.deployer.methods.getElection(address).call()

    this.props.handleElectionVotingAddress(election[3])
    this.props.handleElectionRegistrationAddress(election[2])
    this.props.handleElectionAdmin(election[0])
    this.props.handleElectionName(election[1])

    if(election[0] === this.props.metaMask.account) {
      this.setState({
        user: "Administrator"
      })
    } else {
      this.setState({
        user: "Observer"
      })
    }

    var reg = new this.state.web3.eth.Contract(RegistrationABI.abi, election[2])
    var r_begin = await reg.methods.begin().call()
    var r_end = await reg.methods.end().call()

    this.props.handleElectionRegBegin(r_begin)
    this.props.handleElectionRegEnd(r_end)

    var vote = new this.state.web3.eth.Contract(VotingABI.abi, election[3])
    var v_begin = await vote.methods.begin().call()
    var v_end = await vote.methods.end().call()
    
    this.props.handleElectionVoteBegin(v_begin)
    this.props.handleElectionVoteEnd(v_end)

    var _electionType = await vote.methods.electoralSystem().call()
    this.props.handleElectionType(_electionType)
    this.setState({
      registration: reg,
      voting: vote
    })
    var checks = await reg.methods.getVoter(this.props.metaMask.account).call()

    if(checks[1] !== '0x0000000000000000000000000000000000000000') {
      this.props.handleSVNominated(checks[1])
    } else {
      this.props.handleSVNominated(null)
    }
    this.props.handleSVidCode(checks[2])
    this.props.handleSVTimeApplied(checks[3])
    this.props.handleSVTimeChecked(checks[4])

    checks = await reg.methods.getVoterChecks(this.props.metaMask.account).call()

    this.props.handleSVApplied(checks[0])
    if(checks[2] === true) {
      this.setState({
        user: "Voter"
      })
    }
    this.props.handleSVChecked(checks[1])
    this.props.handleSVValid(checks[2])
    this.props.handleSVVoted(checks[3])

    var isCandidate = await reg.methods.isAppliedCandidate(this.props.metaMask.account).call()
    this.props.handleSCApplied(isCandidate)
    if(isCandidate) {
      var candidateChecks = await reg.methods.getCandidate(this.props.metaMask.account).call()
      this.props.handleSCValid(candidateChecks[5])
      this.props.handleSCTimeApplied(candidateChecks[4])
      this.props.handleSCTimesNominated(candidateChecks[2])
      if(candidateChecks[5] === true) {
        this.setState({
          user: "Candidate"
        })
      }
    }
 
    var key = await vote.methods.publickey().call()

    var pbk = {
      n : key.n,
      nSquared : key.nSquared,
      g : key.g,
      bits: key.bits
    }

    key = await vote.methods.privatekey().call()

    var pvk = {
      lambda : key.lambda,
      denom : key.denom
    }
    
    this.props.handlePBK(pbk)
    this.props.handlePVK(pvk)

    var numCandidates = await reg.methods.getNumCandidates().call()
    var candidates = []
    for(var i = 0; i < numCandidates; i++) {
      var candidate = await reg.methods.validCandidates(i).call() 
      
      var name = await reg.methods.getCandidateName(candidate).call()
      var nominators = (await reg.methods.getCandidate(candidate).call())[1]
      var ptr = (await reg.methods.candidates(candidate).call()).ptr

      var c = {
        address: candidate,
        first_name: name[0],
        last_name: name[1],
        nominators: nominators,
        index: ptr
      }
      
      candidates.push(c)
    }

    this.props.handleElectionCandidates(candidates)

    var numVotes = await vote.methods.getNumberVotes().call()
    var ballots = []

    for(var i = 0; i < numVotes; i++) {
      var item = await vote.methods.ballotBox(i).call()
      
      var _vote = {
        timestamp: item.timestamp,
        vote: item.vote
      }
      ballots.push(_vote)
    }

    this.props.handleElectionVotes(ballots)
  
    this.setState({
      checks: {
        loaded_election: true,
        all_elections: this.state.checks.all_elections,
        self_elections: this.state.checks.self_elections,
        loaded_web3: this.state.checks.loaded_web3,
        loaded_deployer: this.state.checks.loaded_deployer,
      }
    })

    this.setCurrentElectionStage()
  }
  
  async getElections() {

    var elections = await this.state.deployer.methods.getAllElections().call()
    var obj = []
    for(var i = 0; i < elections.length; i++) {
      var x = await this.state.deployer.methods.getElection(elections[i]).call()
      var electionItem = {
        "election_owner" : x[0],
        "election_name" : x[1],
        "address_reg" : x[2],
        "address_vote" : x[3],
        "created_at" : x[4],
        "system" : ElectionTypes[x[5]]
      }
      obj.push(electionItem)
    }
    this.props.handleElections(obj)

    this.setState({
      checks: {
        loaded_election: this.state.checks.loaded_election,
        all_elections: true,
        self_elections: this.state.checks.self_elections,
        loaded_web3: this.state.checks.loaded_web3,
        loaded_deployer: this.state.checks.loaded_deployer,
      }
    })
  }

  async getUserElections() {

    var userElections = []
    var candidateElections = []
    for(var i = 0; i < this.props.elections.length; i++) {
      var reg = new this.state.web3.eth.Contract(RegistrationABI.abi, this.props.elections[i].address_reg)
      var isUserElection = await reg.methods.isAppliedVoter(this.props.metaMask.account).call()
      var isCandidateElection = await reg.methods.isAppliedCandidate(this.props.metaMask.account).call()
      if(isUserElection) {
        userElections.push(this.props.elections[i].address_vote)
      }
      if(isCandidateElection) {
        candidateElections.push(this.props.elections[i].address_vote)
      }
    }
    this.props.handleUserElections(userElections)
    this.props.handleCandidateElections(candidateElections)
  }

  async getAdminElections() {
    var adminElections = await this.state.deployer.methods.getUserElections().call({from: this.props.metaMask.account})
    this.props.handleAdminElections(adminElections)
  }

  async renderOnTransaction(type, tx, count) {
    var toastId = null;
    console.log(count)

    if(type === 0) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "ELECTION ADDED", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.getElections()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 1) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Registration Time Set", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          var r_begin = await this.state.registration.methods.begin().call()
          var r_end = await this.state.registration.methods.end().call()
          
          this.props.handleElectionRegBegin(r_begin)
          this.props.handleElectionRegEnd(r_end)
          
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 2) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Applied As Voter", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 3) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Applied As Candidate", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 4) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Validated Voter", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 5) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "inValidated Voter", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }


    if(type === 6) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Nominated Candidate", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 7) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Voting Period Set", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 8) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Vote Submitted", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 9) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Election Keys Published", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }

    if(type === 10) {
      if(count === 1) {
        this.toastId = toast("TRANSACTION SUBMITTED", { type: toast.TYPE.INFO});
      } else {
        if(count < 12) {
          toast.update(this.toastId, { render: count + " / 12 confirmations", type: toast.TYPE.INFO});
        }

        if(count === 12) {
          toast.update(this.toastId, { render: "Motion Added", type: toast.TYPE.SUCCESS, autoClose: 5000 });
          this.setElection(this.props.election.voting_address)
          this.resetChecks()
        }
  
        if(count === 24) {
          toast.dismiss(this.toastId)
        }
      }
    }
  }

  setCurrentElectionStage() {

    const election = this.props.election
    var stage;
    var now = helper.now()

    if(parseInt(election.r_begin, 10) === 0 || parseInt(election.r_begin, 10) > now) {
      stage = 1
    } else if(parseInt(election.r_begin, 10) <= now && parseInt(election.r_end, 10) > now) {
      stage = 2
    } else if(parseInt(election.r_end, 10) <= now && (parseInt(election.v_begin, 10) === 0 || parseInt(election.v_begin, 10) > now)) {
      stage = 3
    } else if(parseInt(election.v_begin, 10) <= now && parseInt(election.v_end, 10) > now) {
      stage = 4
    } else if(parseInt(election.v_end, 10) <= now && election.private_key.lambda === "") {
      stage = 5
    } else if(parseInt(election.v_end, 10) <= now && election.private_key.lambda !== "" && election.private_key.denom !== "") {
      stage = 6
    } else {
      stage = null
    }

    this.props.handleElectionStage(stage)
  }

  componentDidUpdate() {

    if(this.state.checks.all_elections && !this.state.checks.self_elections) {
      this.getAdminElections()
      this.getUserElections()
      if(this.props.election.voting_address !== null) {
        this.setElection(this.props.election.voting_address)
      }
      this.setState({
        checks: {
          loaded_election: this.state.checks.loaded_election,
          all_elections: this.state.checks.all_elections,
          self_elections: true,
          loaded_web3: this.state.checks.loaded_web3,
          loaded_deployer: this.state.checks.loaded_deployer,
        }
      })
    }
  }
    
  render() {
    console.log(this.state.deployer)
    return (
      <div id="outer-container">
      <MetaMask 
      {...this.props} 
      {...this.state} 
      setWeb3={this.setWeb3} 
      resetChecks={this.resetChecks}/>
      <ToastContainer />
      <BrowserRouter>
          <div>
            <ElectionTable {...this.props}/>
            <div id="page-wrap">
              <Header data={this.props.metaMask}/>
              <section className="section search-row">
                <div className="columns">
                  <div className="column is-one-third"></div>
                  <SearchBar {...this.props} web3={this.state.web3} deployer={this.state.deployer} setElection={this.setElection}/>
                  <div className="column is-one-third"></div>
                </div>
              </section>
              <section className="section content-row">
                  
                  <div className="columns" >

                    <Route exact path='/' render={() => 
                      <Landing 
                        {...this.props} 
                        {...this.state} 
                        renderOnTransaction={this.renderOnTransaction} 
                        moveNextStage={this.setCurrentElectionStage}
                      />}
                    />
                    
                    <Route exact path='/election-data' render={() => 
                      <Analytics 
                        data={this.props.elections} 
                        setElection={this.setElection}
                      />}
                    />

                    <Route exact path='/admin' render={() =>
                      <Admin 
                        {...this.props} 
                        web3={this.state.web3} 
                        deployer={this.state.deployer} 
                        renderOnTransaction={this.renderOnTransaction}
                      />}
                    />

                  </div>
              </section>
              
            </div> 
                 
          </div>     
          
      </BrowserRouter>
      {/* <Footer /> */}
      </div>
    )
  }
}

export default App


/*
 *
 * GETH ETHEREUM ACCOUNT DETAILS
 * -----------------------------------
 * PRIVATE-KEY
 * e718d544e0f4f9e55a54f32863acb2a608b50c7df8f0e6e60d9944c4e75f6723
 * 
 * 
 * 
 * ADDRESS
 * 0x05b2AdfD5D03d3FAFcD6C28Bc14E52f61B57Da72
 * 
 * 
 *  web3.fromWei(web3.eth.getBalance('0x05b2AdfD5D03d3FAFcD6C28Bc14E52f61B57Da72'),'ether').toString(10)
 */


