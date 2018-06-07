
var Deployer = artifacts.require("Deployer")

const NAME_ELECTION = "New Election"
const NOM_LIMIT = 2
const ELECTION_TYPE = 0
const NUM_SEATS = 0

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

contract('Deployer Contract Units', function(accounts) {

    var deployer
    var isDeployed
    var address
    var electionList

    var ownerAddress = accounts[0]
    var ownerElections

    var electionObj
    
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

    it("should belong to correct owner", async function() {
        ownerElections = await deployer.getUserElections({from: ownerAddress})
        assert.equal(ownerElections.length, 1, "owner should have 1 election")
        assert.equal(ownerElections[0], electionList[0], "should be same election address as in the gobal elections array")
        assert.equal((await deployer.getUserElections({from: accounts[1]})).length, 0, "address should not have any elections")
    })

    it("contract should identify address as an election", async function() {
        assert.equal(await deployer.isElection(electionList[0]), true, "contract does not identify election")
        assert.equal((await deployer.isElection(ZERO_ADDRESS)), false, "contract identifies wrong election")
    })

    it("should instantiate election with correct information", async function() {
        electionObj = await deployer.getElection(electionList[0])
        assert.equal(electionObj[0], ownerAddress, "owner address is incorrect")
        assert.equal(electionObj[1], NAME_ELECTION, "election name is incorrect")
        assert.equal(/^0x[a-fA-F0-9]{40}$/g.test(electionObj[2]), true, "has an incorrect registration contract address")
        assert.equal(/^0x[a-fA-F0-9]{40}$/g.test(electionObj[3]), true, "has an incorrect voting contract address")
        assert.equal(electionObj[3], electionList[0], "voting contract address should be the election address")
        assert.ok(parseInt(electionObj[4]) > 0, "election has incorrect timestamp")
        assert.ok(parseInt(electionObj[4]) < Date.now() + 1, "election has incorrect timestamp")
        assert.equal(electionObj[5], ELECTION_TYPE, "incorrect election system")
    })
})