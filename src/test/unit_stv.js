const helper = require('../src/helper')
const stv = require('../src/stv')

contract('STV - 3 Seats, 12 Candidates, 200 voters', function() {
    var votes = []
    const NUM_VOTES = 200
    const NUM_SEATS = 3
    const NUM_CANDIDATES = 10

    for(var i = 0; i < NUM_VOTES; i++) {
        var _selections = helper.genSTVMockVotes(NUM_CANDIDATES)
        votes.push(_selections)
    }

    var result = stv.calculateSTVWinners(votes, NUM_SEATS, NUM_CANDIDATES)
    var quota = Math.floor(NUM_VOTES / (NUM_SEATS + 1) + 1)

    it("should use correct number of seats", function() {
        assert.equal(result.seats, NUM_SEATS, "Number of valid seats should equal to " + NUM_SEATS)
    })

    it("should generate the correct quota", function() {
        assert.equal(result.quota, quota, "Quota should equal " + quota)
    })

    it("should use correct number of candidates", function() {
        assert.equal(result.candidates, NUM_CANDIDATES, "Number of Candidates should equal " + NUM_CANDIDATES)
    })

    it("should match the number of votes submitted with votes counted", function() {
        assert.equal(result.counts[0].reduce((a, b) => {return a + b}), NUM_VOTES, "Number of First Preference Votes should equal " + NUM_VOTES)
    })

    it("should fill all seats correctly", function() {
        var num_with_quotas = 0
        for(var i = 0; i < result.counts[result.counts.length - 1].length; i++) {
             if(result.counts[result.counts.length - 1][i] === quota) {
                 num_with_quotas += 1
             }
        }
        assert.equal(num_with_quotas, NUM_SEATS, "Number of candidates left with the quota amount of votes should equal " + NUM_SEATS)
        assert.equal(result.winners.length, NUM_SEATS, "Number of declared winners should equal " + NUM_SEATS)
    })

    it("should correctly seperate winners and losers", function() {
        var match = false
        for(var i = 0; i < result.winners.length; i++) {
            for(var j = 0; j < result.losers.length; j++) {
                if(result.winners[i] === result.losers[j]) {
                    match = true
                    break
                }
            }
            if(match === true) {
                break
            }
        }
        assert.equal(match, false, "Candidate indexes in winners array should not match any indexes in losers array")
    }) 

    it("should match winner indexes with winning count of votes", function() {
        var match = true
        for(var i = 0; i < result.winners.length; i++) {
            if(result.counts[result.counts.length - 1][result.winners[i]] !== quota) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Winning candidate indexes should have corresponding number of votes equal to the quota")        
    })

    it("should match loser indexes with 0 votes", function() {
        var match = true
        for(var i = 0; i < result.losers.length; i++) {
            if(result.counts[result.counts.length - 1][result.losers[i]] !== 0) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Losing candidate indexes should have corresponding number of votes equal to 0")        
    })
})

contract('STV - 6 Seats, 20 Candidates, 2000 voters', function() {
    var votes = []
    const NUM_VOTES = 2000
    const NUM_SEATS = 6
    const NUM_CANDIDATES = 20

    for(var i = 0; i < NUM_VOTES; i++) {
        var _selections = helper.genSTVMockVotes(NUM_CANDIDATES)
        
        votes.push(_selections)
    }
    var result = stv.calculateSTVWinners(votes, NUM_SEATS, NUM_CANDIDATES)
    var quota = Math.floor(NUM_VOTES / (NUM_SEATS + 1) + 1)
    
    it("should use correct number of seats", function() {
        assert.equal(result.seats, NUM_SEATS, "Number of valid seats should equal to " + NUM_SEATS)
    })

    it("should generate the correct quota", function() {
        assert.equal(result.quota, quota, "Quota should equal " + quota)
    })

    it("should use correct number of candidates", function() {
        assert.equal(result.candidates, NUM_CANDIDATES, "Number of Candidates should equal " + NUM_CANDIDATES)
    })

    it("should match the number of votes submitted with votes counted", function() {
        assert.equal(result.counts[0].reduce((a, b) => {return a + b}), NUM_VOTES, "Number of First Preference Votes should equal " + NUM_VOTES)
    })

    it("should fill all seats correctly", function() {
        var num_with_quotas = 0
        for(var i = 0; i < result.counts[result.counts.length - 1].length; i++) {
             if(result.counts[result.counts.length - 1][i] === quota) {
                 num_with_quotas += 1
             }
        }
        assert.equal(num_with_quotas, NUM_SEATS, "Number of candidates left with the quota amount of votes should equal " + NUM_SEATS)
        assert.equal(result.winners.length, NUM_SEATS, "Number of declared winners should equal " + NUM_SEATS)
    })

    it("should correctly identify winners and losers", function() {
        var match = false
        for(var i = 0; i < result.winners.length; i++) {
            for(var j = 0; j < result.losers.length; j++) {
                if(result.winners[i] === result.losers[j]) {
                    match = true
                    break
                }
            }
            if(match === true) {
                break
            }
        }
        assert.equal(match, false, "Candidate indexes in winners array should not match any indexes in losers array")
    }) 

    it("should match winner indexes with winning count of votes", function() {
        var match = true
        for(var i = 0; i < result.winners.length; i++) {
            if(result.counts[result.counts.length - 1][result.winners[i]] !== quota) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Winning candidate indexes should have corresponding number of votes equal to the quota")        
    })

    it("should match loser indexes with 0 votes", function() {
        var match = true
        for(var i = 0; i < result.losers.length; i++) {
            if(result.counts[result.counts.length - 1][result.losers[i]] !== 0) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Losing candidate indexes should have corresponding number of votes equal to 0")        
    })
})

contract('STV - 2 Seats, 3 Candidates, 10 voters', function() {
    var votes = []
    const NUM_VOTES = 10
    const NUM_SEATS = 2
    const NUM_CANDIDATES = 3

    for(var i = 0; i < NUM_VOTES; i++) {
        var _selections = helper.genSTVMockVotes(NUM_CANDIDATES)
        
        votes.push(_selections)
    }
    
    var result = stv.calculateSTVWinners(votes, NUM_SEATS, NUM_CANDIDATES)
    var quota = Math.floor(NUM_VOTES / (NUM_SEATS + 1) + 1)

    it("should use correct number of seats", function() {
        assert.equal(result.seats, NUM_SEATS, "Number of valid seats should equal to " + NUM_SEATS)
    })

    it("should generate the correct quota", function() {
        assert.equal(result.quota, quota, "Quota should equal " + quota)
    })

    it("should use correct number of candidates", function() {
        assert.equal(result.candidates, NUM_CANDIDATES, "Number of Candidates should equal " + NUM_CANDIDATES)
    })

    it("should match the number of votes submitted with votes counted", function() {
        assert.equal(result.counts[0].reduce((a, b) => {return a + b}), NUM_VOTES, "Number of First Preference Votes should equal " + NUM_VOTES)
    })

    it("should fill all seats correctly", function() {
        var num_with_quotas = 0
        for(var i = 0; i < result.counts[result.counts.length - 1].length; i++) {
             if(result.counts[result.counts.length - 1][i] === quota) {
                 num_with_quotas += 1
             }
        }
        assert.equal(num_with_quotas, NUM_SEATS, "Number of candidates left with the quota amount of votes should equal " + NUM_SEATS)
        assert.equal(result.winners.length, NUM_SEATS, "Number of declared winners should equal " + NUM_SEATS)
    })

    it("should correctly identify winners and losers", function() {
        var match = false
        for(var i = 0; i < result.winners.length; i++) {
            for(var j = 0; j < result.losers.length; j++) {
                if(result.winners[i] === result.losers[j]) {
                    match = true
                    break
                }
            }
            if(match === true) {
                break
            }
        }
        assert.equal(match, false, "Candidate indexes in winners array should not match any indexes in losers array")
    }) 

    it("should match winner indexes with winning count of votes", function() {
        var match = true
        for(var i = 0; i < result.winners.length; i++) {
            if(result.counts[result.counts.length - 1][result.winners[i]] !== quota) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Winning candidate indexes should have corresponding number of votes equal to the quota")        
    })

    it("should match loser indexes with 0 votes", function() {
        var match = true
        for(var i = 0; i < result.losers.length; i++) {
            if(result.counts[result.counts.length - 1][result.losers[i]] !== 0) {
                match = false
                break
            }
        }
        assert.equal(match, true, "Losing candidate indexes should have corresponding number of votes equal to 0")        
    })
})