const Web3 = require('web3')
const helper = require('../src/helper')

var Deployer = artifacts.require("Deployer")
var Registration = artifacts.require("./Registration.sol")
var Voting = artifacts.require("./Voting.sol")

const NOM_LIMIT = 2
const NUM_USERS = 41

const ElectionTypes = {
    "plurality" : 0,
    "motion"    : 1,
    "stv"       : 2
}

module.exports = async function(deployer) {

    var web3 = new Web3(new Web3(Web3.givenProvider || 'ws://localhost:8545'))
    var accounts = await web3.eth.getAccounts()
    var deployer = await Deployer.new();
    
    // Instantiate Election Names
    var a = "PRE_ELECTION - Plurality"
    var b = "PRE_VOTING - Plurality"
    var c = "POST_VOTING - Plurality"

    var d = "PRE_ELECTION - Motion"
    var e = "PRE_VOTING - Motion"
    var f = "POST_VOTING - Motion"

    var g = "PRE_ELECTION - STV"
    var h = "PRE_VOTING - STV"
    var i = "POST_VOTING - STV"

    // Generate Elections
    await deployer.newElection(a, NOM_LIMIT, ElectionTypes.plurality, 0, {from: accounts[0]})
    await deployer.newElection(b, NOM_LIMIT, ElectionTypes.plurality, 0, {from: accounts[0]})
    await deployer.newElection(c, NOM_LIMIT, ElectionTypes.plurality, 0, {from: accounts[0]})
    
    await deployer.newElection(d, 0, ElectionTypes.motion, 0, {from: accounts[0]})
    await deployer.newElection(e, 0, ElectionTypes.motion, 0, {from: accounts[0]})
    await deployer.newElection(f, 0, ElectionTypes.motion, 0, {from: accounts[0]})

    await deployer.newElection(g, 1, ElectionTypes.stv, 2, {from: accounts[0]})
    await deployer.newElection(h, 1, ElectionTypes.stv, 2, {from: accounts[0]})
    await deployer.newElection(i, 1, ElectionTypes.stv, 2, {from: accounts[0]})

    // Instantiate Election Address Objects
    var elections = await deployer.getAllElections()

    var a_election = await deployer.getElection(elections[0])
    var b_election = await deployer.getElection(elections[1])
    var c_election = await deployer.getElection(elections[2])

    var d_election = await deployer.getElection(elections[3])
    var e_election = await deployer.getElection(elections[4])
    var f_election = await deployer.getElection(elections[5])
    
    var g_election = await deployer.getElection(elections[6])
    var h_election = await deployer.getElection(elections[7])
    var i_election = await deployer.getElection(elections[8])

    // Objects to facilitate election actions
    var voting = null
    var registration = null
    var regStart
    var regEnd
    var voteStart
    var voteEnd
    var pbk
    var pvk
    var numVoters
    var numCandidates
    
    /***************************************************************************/
    // A_ELECTION
    console.log(a + " : ready")
    console.log()


    /***************************************************************************/
    // B_ELECTION

    voting = await Voting.at(b_election[3])
    registration = await Registration.at(b_election[2])

    await helper.genKey(b_election[3])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address, {from: accounts[0]})
    await helper.waitTillTime(regStart)
    await helper.setRegister(registration, accounts, NUM_USERS)

    console.log("CANDIDATES     :: " + (await registration.getCounts())[4])
    console.log("VOTERS         :: " + (await registration.getCounts())[2])
    console.log("REG DURATION   :: " + (regEnd - regStart))

    console.log(b + " : ready")
    console.log()

    
    /***************************************************************************/
    // C_ELECTION
    voting = await Voting.at(c_election[3])
    registration = await Registration.at(c_election[2])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address)
    await helper.waitTillTime(regStart)

    await helper.setRegister(registration, accounts, NUM_USERS)
    await helper.genKey(c_election[3])

    await helper.waitTillTime(regEnd + 0.5)

    console.log("CANDIDATES     :: " + (await registration.getCounts())[4])
    console.log("VOTERS         :: " + (await registration.getCounts())[2])

    pbk = await helper.getPBK(c_election[3])
    voteStart = helper.now() + 1
    voteEnd = voteStart + (NUM_USERS / 10)
    await helper.waitTillTime(voteStart)
    await voting.start(voteStart, voteEnd, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
    numVoters = await registration.getNumVoters()
    await helper.makeVotes(voting, accounts, pbk, numVoters)

    
    console.log("VOTES          :: " + (await voting.getNumberVotes()))
    console.log("REG DURATION   :: " + (regEnd - regStart))
    console.log("VOTE DURATION  :: " + (voteEnd - voteStart))

    console.log(c + " : ready")
    console.log()


    /***************************************************************************/
    // D_ELECTION
    console.log(d + " : ready")
    console.log()


    /***************************************************************************/
    //E_ELECTION
    voting = await Voting.at(e_election[3])
    registration = await Registration.at(e_election[2])

    await helper.genKey(e_election[3])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address)
    await helper.waitTillTime(regStart)
    await helper.setMotions(registration, accounts)

    console.log("MOTIONS        :: " + (await registration.getCounts())[5])
    console.log("VOTERS         :: " + (await registration.getCounts())[2])
    console.log("REG DURATION   :: " + (regEnd - regStart))

    console.log(e + " : ready")
    console.log()


    /***************************************************************************/
    //F_ELECTION
    voting = await Voting.at(f_election[3])
    registration = await Registration.at(f_election[2])

    await helper.genKey(f_election[3])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address)
    await helper.waitTillTime(regStart)

    await helper.setMotions(registration, accounts, NUM_USERS)

    await helper.waitTillTime(regEnd + 0.5)

    console.log("MOTIONS        :: " + (await registration.getCounts())[5])
    console.log("VOTERS         :: " + (await registration.getCounts())[2])

    pbk = await helper.getPBK(f_election[3])

    voteStart = helper.now() + 1
    voteEnd = voteStart + (NUM_USERS / 10)
    await voting.start(voteStart, voteEnd, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
    numVoters = await registration.getNumVoters()
    await helper.makeVotes(voting, accounts, pbk, numVoters)
    
    console.log("VOTES          :: " + (await voting.getNumberVotes()))
    console.log("REG DURATION   :: " + (regEnd - regStart))
    console.log("VOTE DURATION  :: " + (voteEnd - voteStart))

    console.log(f + " : ready")
    console.log()


    /***************************************************************************/
    // G_ELECTION
    console.log(g + " : ready")


    /***************************************************************************/
    // H_ELECTION
    voting = await Voting.at(h_election[3])
    registration = await Registration.at(h_election[2])

    await helper.genKey(h_election[3])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address, {from: accounts[0]})
    await helper.waitTillTime(regStart + 0.5)
    await helper.setRegisterSTV(registration, accounts, NUM_USERS)

    console.log(h + " : ready")


    /***************************************************************************/
    // i_ELECTION
    voting = await Voting.at(i_election[3])
    registration = await Registration.at(i_election[2])

    await helper.genKey(i_election[3])

    regStart = helper.now() + 1
    regEnd = regStart + (NUM_USERS / 10)
    await registration.start(regStart, regEnd, voting.address, {from: accounts[0]})
    await helper.waitTillTime(regStart + 0.5)
    await helper.setRegisterSTV(registration, accounts, NUM_USERS)

    await helper.waitTillTime(regEnd)

    console.log("CANDIDATES     :: " + (await registration.getCounts())[4])
    console.log("VOTERS         :: " + (await registration.getCounts())[2])

    pbk = await helper.getPBK(i_election[3])

    voteStart = helper.now()
    voteEnd = voteStart + (NUM_USERS / 10)

    await voting.start(voteStart, voteEnd, pbk.n, pbk.nSquared, pbk.g, pbk.bits)

    numVoters = await registration.getNumVoters()
    numCandidates = await registration.getNumCandidates()
    console.log("NUM CANDIDATES " + numCandidates)
    await helper.makeVotesSTV(voting, accounts, pbk, numVoters, numCandidates)
    
    console.log("VOTES          :: " + (await voting.getNumberVotes()))
    console.log("REG DURATION   :: " + (regEnd - regStart))
    console.log("VOTE DURATION  :: " + (voteEnd - voteStart))

    console.log(h + " : ready")

    console.log()
    console.log("Deployer Address :: " + deployer.address)
    
}
