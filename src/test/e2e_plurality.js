const helper = require('../src/helper')

var Deployer = artifacts.require("Deployer")
var Registration = artifacts.require("./Registration.sol")
var Voting = artifacts.require("./Voting.sol")

const NOM_LIMIT = 2
const NUM_USERS = 41
const NUM_SEATS = 0
const ELECTION_TYPE = 0
const NAME_ELECTION = "PL_TEST"

contract('Plurality End-to-End', function(accounts) {
    
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
        await helper.setRegister(registration, accounts, NUM_USERS)
        var v = await registration.getNumVoters()
        assert.equal(v, NUM_USERS - 1, "incorrect number of registered voters")
    })

    it("should register 2 candidates", async function() {
        var c = await registration.getNumCandidates()
        assert.equal(c, 2, "incorrect number of registered voters")
    })

    it("should generate 40 encrypted votes", async function() {
        await helper.genKey(election[3])
        await helper.waitTillTime(regEnd + 0.5)
        pbk = await helper.getPBK(election[3])
        voteStart = helper.now() + 1
        voteEnd = voteStart + (NUM_USERS / 5)
        await helper.waitTillTime(voteStart)
        await voting.start(voteStart, voteEnd, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        await helper.makeVotes(voting, accounts, pbk, NUM_USERS)

        var countVotes = await voting.getNumberVotes()
        assert.equal(countVotes, NUM_USERS - 1, "Incorrect number of votes")
        // console.log(countVotes)
        
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

    it("should calculate the tally as encrypted string", async function() {
        pvk = await helper.getPVK(election[3])
        await helper.waitTillTime(voteEnd)
        tallyResult = await helper.tally(tally, pbk)
        assert.equal(/[0-9A-Fa-f]{6}/g.test(tallyResult), true, "tally encryption is incorrect")
        
    })

    it("should decrypt string to correct value", async function(){
        pbk.bits += ""
        decryptedResult = await helper.decrypt(tallyResult, pbk, pvk)
        assert.equal(decryptedResult, 1300, "decrypted result is incorrect")
    })

    it("should calculate a result from decrypted tally", async function() {
        electionResults = await helper.calculateWinner(decryptedResult.toString(2), NUM_USERS - 1, 2)
        assert.equal(electionResults[0].index, 0, "incorrect 1st index")
        assert.equal(electionResults[0].votes, 20, "incorrect 1st votes")
        assert.equal(electionResults[1].index, 1, "incorrect 2nd index")
        assert.equal(electionResults[1].votes, 20, "incorrect 2nd votes")
    })
})