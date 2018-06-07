const helper = require('../src/helper')
const fs = require('fs')
const os = require('os')

const dir = os.homedir() + '/.electio'

const TEST_KEY = "0xTEST_KEY"
contract('Helper function Units', function() {

    var pbk
    var pvk
    var encryption

    it("should return correct Network ID's", function() {
        assert.equal(helper.NetIdHelper(1), "Main", "should return correct network ID")
        assert.equal(helper.NetIdHelper(2), "Morden", "should return correct network ID")
        assert.equal(helper.NetIdHelper(3), "Ropesten", "should return correct network ID")
        assert.equal(helper.NetIdHelper(4), "Rinkeby", "should return correct network ID")
        assert.equal(helper.NetIdHelper(42), "Kovan", "should return correct network ID")
        assert.equal(helper.NetIdHelper(-1), "Unknown", "should return correct network ID")
    })

    it("should calculate correct vote numeric", function() {
        assert.equal(helper.calculateVoteNumeric(0, 8), 1, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(1, 7), 8, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(1, 8), 16, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(2, 7), 64, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(2, 8), 256, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(3, 7), 512, "numeric is incorrect")
        assert.equal(helper.calculateVoteNumeric(3, 8), 4096, "numeric is incorrect")
    })

    it("should calculate winner from tally numeric", function() {
        var obj = helper.calculateWinner(((4096 * 3) + (256 * 2) + 16).toString(2), 8, 4)
        assert.equal(obj[0].index, 3, "incorrect index")
        assert.equal(obj[0].votes, 3, "incorrect votes")
        assert.equal(obj[1].index, 2, "incorrect index")
        assert.equal(obj[1].votes, 2, "incorrect votes")
        assert.equal(obj[2].index, 1, "incorrect index")
        assert.equal(obj[2].votes, 1, "incorrect votes")
        assert.equal(obj[3].index, 0, "incorrect index")
        assert.equal(obj[3].votes, 0, "incorrect votes")
    })

    it("should generate key", async function() {
        var obj = await helper.genKey(TEST_KEY)
        await fs.exists(dir + "/keys/" + TEST_KEY, function(exists) {
            assert.equal(exists, true, "file does not exist")
        })
    })

    it("should retrieve public key", async function() {
        pbk = await helper.getPBK(TEST_KEY)
        assert.equal(/[0-9A-Fa-f]{6}/g.test(pbk.nSquared), true, "nSquared not correct")
        assert.equal(pbk.nSquared.length, 512, "nSquared not correct")
        assert.equal(/[0-9A-Fa-f]{6}/g.test(pbk.g), true, "g not correct")
        assert.equal(pbk.g.length, 256, "g not correct")
        assert.equal(/[0-9A-Fa-f]{6}/g.test(pbk.n), true, "n not correct")
        assert.equal(pbk.n.length, 256, "n not correct")
        assert.equal(pbk.bits, 1024, "bits not correct")
    })

    it("should retrieve private key", async function() {
        pvk = await helper.getPVK(TEST_KEY)
        assert.equal(/[0-9A-Fa-f]{6}/g.test(pvk.lambda), true, "lambda not correct")
        assert.equal(/[0-9A-Fa-f]{6}/g.test(pvk.denom), true, "denom not correct")
    })

    it("should encrypt correctly", async function() {
        encryption = await helper.encrypt(1, pbk)
        assert.equal(/[0-9A-Fa-f]{6}/g.test(encryption), true, "encryption not correct")
    })

    it("should decrypt correctly", async function() {
        pbk.bits = pbk.bits + ""
        var decryption = await helper.decrypt(encryption, pbk, pvk)
        assert.equal(decryption, 1, "decryption not correct")
    })

    it("should tally correctly", async function() {
        var enc1 = await helper.encrypt(1, pbk)
        var enc2 = await helper.encrypt((2).toString(2), pbk)
        var votes = [enc1, enc2]
        var tally = await helper.tally(votes, pbk)
        assert.equal(/[0-9A-Fa-f]{6}/g.test(tally), true, "tally not correct")

        var decryption = await helper.decrypt(tally, pbk, pvk)
        assert.equal(decryption, 3, "decryption not correct")
    })
})  