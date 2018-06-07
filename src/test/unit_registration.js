const Registration = artifacts.require("Registration")
const helper = require('../src/helper')

const NAME_ELECTION = "New Election"
const NOM_LIMIT = 1
const ELECTION_TYPE = 0
const NUM_SEATS = 0

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
const RAND_ADDRESS = "0x123456789ABCDEF123456789ABCDEF123456789A"

contract('Registration Contract Units', function(accounts) {

    var regStart
    var regEnd

    var reg    
    var counts

    it("contract artifact should be deployable", async function() {
        reg = await Registration.new(NAME_ELECTION, accounts[0], NOM_LIMIT);
        isDeployed = await reg.constructor.isDeployed()
        
        assert.equal(isDeployed, true, "contract is not deployed")
    })


    it("should fail voter registration if before time window", async function() {
        var tx = await reg.registerAsVoter(1, {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await reg.getNumVoters()), 0, "no voters should be added")  
    })


    it("should fail candidate registration if before time window", async function() {
        var tx = await reg.registerAsCandidate(1, "Tom", "Tuohy", {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await reg.getNumCandidates()), 0, "no voters should be added")  
    })
    

    it("should fail adding of motions if before time window", async function() {
        var tx = await reg.addMotion("My new Motion", {from: accounts[0]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await reg.getCounts())[5], 0, "no voters should be added")  
    })


    it("should fail voter validation if not owner", async function() {
        var tx = await reg.validateVoter(accounts[1], 1, {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })


    it("should fail voter invalidation if not owner", async function() {
        var tx = await reg.validateVoter(accounts[1], 1, {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })


    it("should fail voter validation if not owner", async function() {
        var tx = await reg.validateVoter(accounts[1], 1, {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })

    // In time ~~~


    it("should start registration process in ~5 seconds", async function() {
        regStart = helper.now() + 5
        regEnd = regStart + 5
        var tx = await reg.start(regStart, regEnd, RAND_ADDRESS)
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal(await reg.begin(), regStart, "registration start should be instantiated")
        assert.equal(await reg.end(), regEnd, "registration end should be instantiated")
        assert.ok(await reg.begin() > helper.now(), "registration should be set in the future")
        await helper.waitTillTime(regStart)
        assert.ok(await reg.begin() <= helper.now(), "registration should now be started")
    })


    it("should only allow start function be called once", async function() {
        var tx = await reg.start(regStart + 5, regEnd, RAND_ADDRESS)
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
    })


    it("should allow voter register once for election", async function() {
        var tx1 = await reg.registerAsVoter(1, {from: accounts[1]})
        var tx2 = await reg.registerAsVoter(1, {from: accounts[1]})
        counts = await reg.getCounts()
        assert.equal(tx1.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal(tx2.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal(counts[0], 1, "applicants list should be of length 1")
        assert.equal((await reg.applicantVoters(0)), accounts[1], "voter address should be added in applied list")
        assert.equal((await reg.isAppliedVoter(accounts[1])), true, "applicant should be applied")
    })


    it("should have correct voter status after application", async function() {
        var obj = await reg.getVoterChecks(accounts[1])
        assert.equal(obj[0], true, "voter should be applied")
        assert.equal(obj[1], false, "voter should not be checked")
        assert.equal(obj[2], false, "voter should not be validated")
        assert.equal(obj[3], false, "voter should not have voted")  
    })


    it("should only allow owner add motions", async function() {
        var _motion = "My new motion"
        var tx1 = await reg.addMotion(_motion, {from: accounts[0]})
        var tx2 = await reg.addMotion(_motion, {from: accounts[1]})
        counts = await reg.getCounts()
        assert.equal(tx1.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal(tx2.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal(counts[5], 1, "one motion should be added")
        assert.equal((await reg.motions(0)), _motion, "added motion should match")
    })


    it("should only allow admin validate applied voter", async function() {
        var tx = await reg.validateVoter(accounts[1], 1)
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal((await reg.isValidVoter(accounts[1])), true, "should be valid address")
    })


    it("should only allow admin invalidate applied voter", async function() {
        await reg.registerAsVoter(2, {from: accounts[2]})
        var tx = await reg.inValidateVoter(accounts[2])
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal((await reg.isInValidVoter(accounts[2])), true, "should be valid address")
    })


    it("should have correct voter status after validation", async function() {
        var obj = await reg.getVoterChecks(accounts[1])
        assert.equal(obj[0], true, "voter should be applied")
        assert.equal(obj[1], true, "voter should be checked")
        assert.equal(obj[2], true, "voter should be validated")
        assert.equal(obj[3], false, "voter should not have voted")  
        obj = await reg.getVoterChecks(accounts[2])
        assert.equal(obj[0], true, "voter should be applied")
        assert.equal(obj[1], true, "voter should be checked")
        assert.equal(obj[2], false, "voter should not be validated")
        assert.equal(obj[3], false, "voter should not have voted")  
    })


    it("should allow candidate register once for election", async function() {
        var tx1 = await reg.registerAsCandidate(1, "Daniel", "Craig", {from: accounts[3]})
        var tx2 = await reg.registerAsCandidate(1, "Daniel", "Craig", {from: accounts[3]})
        counts = await reg.getCounts()
        assert.equal(tx1.receipt.status, '0x01', "transaction status should equal 0x01")
        assert.equal(tx2.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal(counts[1], 1, "only one candidate should have applied")
    })

    it("should submit candidate name correctly", async function() {
        var name = await reg.getCandidateName(accounts[3])
        assert.equal(name[0], "Daniel", "first Name should be correct")
        assert.equal(name[1], "Craig", "last Name should be correct")
    })

    
    it("should allow prevent candidates nominating themselves", async function() {
        var tx = await reg.nominateCandidate(accounts[3], {from: accounts[3]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        var obj = await reg.getCandidate(accounts[3])
        assert.equal(obj[5], false, "candidate should not be valid")
    })


    it("should allow voter to nominate candidate", async function() {
        var tx = await reg.nominateCandidate(accounts[3], {from: accounts[1]})
        assert.equal(tx.receipt.status, '0x01', "transaction status should equal 0x01")
        var obj = await reg.getCandidate(accounts[3])
        assert.equal(obj[1][0], accounts[1], "nominator doesn't match")
        assert.equal(obj[3], true, "candidate should be applied")
        assert.equal(obj[5], true, "candidate should be valid")
    })

    it("should fail voter registration if after time window", async function() {
        await helper.waitTillTime(regEnd + 1)
        var tx = await reg.registerAsVoter(3, {from: accounts[3]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal(await reg.getNumVoters(), 1, "no voters should be added")  
    })


    it("should fail candidate registration if after time window", async function() {
        var tx = await reg.registerAsCandidate(3, "Tom", "Tuohy", {from: accounts[3]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await reg.getNumCandidates()), 1, "no voters should be added")  
    })
    

    it("should fail adding of motions if after time window", async function() {
        var tx = await reg.addMotion("My new Motion", {from: accounts[0]})
        assert.equal(tx.receipt.status, '0x00', "transaction status should equal 0x00")
        assert.equal((await reg.getCounts())[5], 1, "no voters should be added")  
    })
})