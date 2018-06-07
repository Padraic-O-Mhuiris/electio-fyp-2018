const helper = require('../src/helper')
const stv = require('../src/stv')

var Deployer = artifacts.require("Deployer")
var Registration = artifacts.require("./Registration.sol")
var Voting = artifacts.require("./Voting.sol")

const NOM_LIMIT = 1
const NUM_USERS = 41
const NUM_SEATS = 2
const ELECTION_TYPE = 2
const NAME_ELECTION = "STV_TEST"

contract('STV End-to-End', function(accounts) {
    
    var address
    var ownerAddress = accounts[0]
    var electionObj
    var electionList
    var election
    var deployer
    var voting
    var registration

    var regStart
    var regEnd
    var voteStart
    var voteEnd

    var pbk
    var pvk

    var tally = []
    var tallyResult
    var decryptedResult
    var electionResults

    it("contract artifact should be deployable", async function() {
        deployer = await Deployer.new();
        isDeployed = await deployer.constructor.isDeployed()
        assert.equal(isDeployed, true, "contract is not deployed")
    })

    it("contract should have a correct ethereum address", async function() {
        address = await deployer.address
        assert.equal(/^0x[a-fA-F0-9]{40}$/g.test(address), true, "contract is not deployed")
    })

    it("should create a new election", async function() {
        var tx = await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS, {from: ownerAddress})
        electionList = await deployer.getAllElections()
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal(electionList.length, 1, "No elections were added")      
    })

    it("should be the correct election system", async function() {
        electionObj = await deployer.getElection(electionList[0])
        election = await deployer.getElection(electionList[0])

        voting = await Voting.at(election[3])
        registration = await Registration.at(election[2])
        assert.equal(electionObj[5], ELECTION_TYPE, "incorrect election system")
    })

    it("should register 40 voters", async function() {
        var regStart = helper.now() + 1
        var regEnd = regStart + (NUM_USERS / 5)
        await registration.start(regStart, regEnd, voting.address, {from: accounts[0]})
        await helper.waitTillTime(regStart)
        await helper.setRegisterSTV(registration, accounts, NUM_USERS)
        var v = await registration.getNumVoters()
        assert.equal(v, NUM_USERS - 1, "incorrect number of registered voters")
    })

    it("should register 6 candidates", async function() {
        var c = await registration.getNumCandidates()
        assert.equal(c, 6, "incorrect number of registered voters")
    })

    it("should generate 40 encrypted votes", async function() {
        await helper.genKey(election[3])
        await helper.waitTillTime(regEnd + 0.5)
        pbk = await helper.getPBK(election[3])
        voteStart = helper.now() + 1
        voteEnd = voteStart + (NUM_USERS / 5)
        await helper.waitTillTime(voteStart)
        await voting.start(voteStart, voteEnd, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        await helper.makeVotesSTV(voting, accounts, pbk, NUM_USERS, 6)

        var countVotes = await voting.getNumberVotes()
        assert.equal(countVotes, NUM_USERS - 1, "Incorrect number of votes")
    })

    it("votes should be encrypted correctly", async function() {
        var i
        for(i = 0; i < NUM_USERS - 1; i++) {
            var vote = (await voting.ballotBox(i))[0]         
            tally.push(vote)  
            if(!/[0-9A-Fa-f]{6}/g.test(vote)){
                break
            }
        }
        assert.equal(i, NUM_USERS - 1, "all votes are in random hex")
    })

    it("should calculate a correct result", async function(){
        pvk = await helper.getPVK(election[3])
        pbk.bits += ""
        var _votes = []
        for(var i = 0; i < tally.length; i++) {
            _votes.push(((await helper.decrypt(tally[i], pbk, pvk)) + "").slice(1).match(/.{1,2}/g))
            for(var j = 0; j < _votes[i].length; j++) {
                _votes[i][j] = parseInt(_votes[i][j])
            } 
        }
        
        electionResults = stv.calculateSTVWinners(_votes, 2, 6)
        assert.equal(electionResults.quota, 14, "incorrect quota")
        assert.equal(electionResults.winners.length, 2, "incorrect number of winners")
        assert.equal(electionResults.losers.length, 4, "incorrect number of losers")

    })
})