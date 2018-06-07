const Registration = artifacts.require("Registration")
const Deployer = artifacts.require("Deployer")
const Voting = artifacts.require("Voting")
const helper = require('../src/helper')


const NAME_ELECTION = "New Election"
const NOM_LIMIT = 2
const ELECTION_TYPE = 0
const NUM_SEATS = 0

const TEST_KEY = "0xTEST_KEY"

contract('Voting Contract Units', function(accounts) {

    const t = 1

    it("should not start voting period during registration", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t + 10
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_START)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        var tx = await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })

    it("should start voting period after registration", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t + 1
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        var tx = await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.ok(await voting.begin() > REG_END, "voting should start after registration")
    })

    it("should submit voting times correctly", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t + 1
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        assert.equal(await voting.begin(), VOTE_START, "vote start time incorrect")
        assert.equal(await voting.end(), VOTE_END, "vote start time incorrect")
        
    })

    it("should submit public key correctly", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t + 1
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var vpbk = await voting.publickey()
        assert.equal(vpbk[0], pbk.n, "public key incorrect")
        assert.equal(vpbk[1], pbk.nSquared, "public key incorrect")
        assert.equal(vpbk[2], pbk.g, "public key incorrect")
        assert.equal(vpbk[3], pbk.bits, "public key incorrect")
    })

    it("should record correct election state on start", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + 2
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t
        const NUM_VOTERS = 10
        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_START + 0.5)
        await setRegister(registration, accounts, NUM_VOTERS)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        assert.equal(await voting.numCandidates(), 2, "wrong number of candidates")
        assert.equal(await voting.numVoters(), NUM_VOTERS, "wrong number of voters")
        assert.equal(await voting.owner(), accounts[0], "owner is incorrect")
        assert.equal(await voting.numSeats(), NUM_SEATS, "Wrong number of seats")
        assert.equal(await voting.electoralSystem(), ELECTION_TYPE, "Wrong election type")
    })

    it("should prevent publishing of election key before end of voting", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + 10

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var pvk = await helper.getPVK(TEST_KEY)
        var tx = await voting.publishPrivateKey(pvk.lambda, pvk.denom)

        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })

    it("should fail publishing of election key if not admin", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var pvk = await helper.getPVK(TEST_KEY)
        await helper.waitTillTime(VOTE_END)
        var tx = await voting.publishPrivateKey(pvk.lambda, pvk.denom, {from: accounts[1]})

        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })

    it("should publish election key if owner and after voting", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + t
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var pvk = await helper.getPVK(TEST_KEY)
        await helper.waitTillTime(VOTE_END + 1)

        assert.ok(await voting.end() < helper.now(), "time is incorrect")

        var tx = await voting.publishPrivateKey(pvk.lambda, pvk.denom)

        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
    })

    it("should allow registered voter to submit vote", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + 2
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_START + 0.5)
        await registration.registerAsVoter(1, {from: accounts[1]})
        await registration.validateVoter(accounts[1], 1)
        
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var tx = await voting.submitVote("vote_1", {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal((await voting.ballotBox(0))[0], "vote_1", "vote is incorrect")
        assert.equal(await voting.getNumberVotes(), 1, "incorrect number of votes")
    })

    it("should fail unregistered voter to submit vote", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + 2
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
                
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        var tx = await voting.submitVote("vote_1", {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")

    })

    it("should fail if voter submits twice", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + 2
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_START + 0.5)
        await registration.registerAsVoter(1, {from: accounts[1]})
        await registration.validateVoter(accounts[1], 1)
        
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        await voting.submitVote("vote_1", {from: accounts[1]})
        var tx = await voting.submitVote("vote_1", {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await voting.ballotBox(0))[0], "vote_1", "vote is incorrect")
        assert.equal(await voting.getNumberVotes(), 1, "incorrect number of votes")
    })

    it("should change voter status on vote submission", async function() {

        const REG_START = helper.now() + t
        const REG_END = REG_START + 2
        const VOTE_START = REG_END + t
        const VOTE_END = VOTE_START + t

        var deployer = await Deployer.new();
        await deployer.newElection(NAME_ELECTION, NOM_LIMIT, ELECTION_TYPE, NUM_SEATS)
        var electionList = await deployer.getAllElections()
        var electionObj = await deployer.getElection(electionList[0])
        
        var registration = Registration.at(electionObj[2])
        var voting = Voting.at(electionObj[3])
        await registration.start(REG_START, REG_END, voting.address)
        await helper.waitTillTime(REG_START + 0.5)
        await registration.registerAsVoter(1, {from: accounts[1]})
        await registration.validateVoter(accounts[1], 1)
        
        await helper.waitTillTime(REG_END)

        await helper.genKey(TEST_KEY)
        var pbk = await helper.getPBK(TEST_KEY)
        await voting.start(VOTE_START, VOTE_END, pbk.n, pbk.nSquared, pbk.g, pbk.bits)
        await voting.submitVote("vote_1", {from: accounts[1]})
        var obj = await registration.getVoterChecks(accounts[1])
        assert.equal(obj[0], true, "voter should be applied")
        assert.equal(obj[1], true, "voter should be checked")
        assert.equal(obj[2], true, "voter should be validated")
        assert.equal(obj[3], true, "voter should have voted") 
    })

})

async function setRegister(registration, accounts, num_voters) {
    for(var j = 1; j < num_voters + 1; j++) {
        if(j === 1) {
            await registration.registerAsCandidate(1, 'Patrick', 'Swayze', {from: accounts[1]})
            await registration.validateVoter(accounts[1], 1)
        }else if(j === 2) {
            await registration.registerAsCandidate(2, 'Daniel', 'Craig', {from: accounts[2]})
            await registration.validateVoter(accounts[2], 2)
        }else {  
            await registration.registerAsVoter(j, {from: accounts[j]})
            await registration.validateVoter(accounts[j], j)
            if(j === 4) {
                await registration.nominateCandidate(accounts[1], {from: accounts[j]})
            }   
            if(j === 7) {
                await registration.nominateCandidate(accounts[1], {from: accounts[j]})
            }
            if(j === 5) {
                await registration.nominateCandidate(accounts[2], {from: accounts[j]})
            }   
            if(j === 8) {
                await registration.nominateCandidate(accounts[2], {from: accounts[j]})
            }
        }
    }
}