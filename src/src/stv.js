
function calcDroopQuota(num_voters, num_seats) {

    return Math.floor(num_voters / (num_seats + 1) + 1)
}

function runCount(votes, num_Candidates) {

    var _count = [...Array(num_Candidates)].fill(0)
    for(var i = 0; i < votes.length; i++) {
        _count[votes[i][0]] += 1
    }

    return _count
}

function isRoundWinner(lastCount, winners, quota) {

    lastCount.sort((a, b) => {return a < b ? 1 : -1})

    var num_over_quota = 0 
    for(var i = 0; i < lastCount.length; i++) {
        if(lastCount[i] >= quota) {
            num_over_quota += 1
        }
    }

    if(num_over_quota > winners.length) {
        return true
    } else {
        return false
    }
}

function getRoundWinners(lastCount, winners, quota) {
    
    var round_winners = []
    for(var i = 0; i < lastCount.length; i++) {
        
        if(lastCount[i] >= quota) {
            var isPreviousWinner = false
            for(var j = 0; j < winners.length; j++) {

                if(winners[j] === i) {
                    isPreviousWinner = true
                }
            }

            if(!isPreviousWinner) {
                round_winners.push(i)
            }
        }
    }

    return round_winners
}


function genVoteAllocations(counts, _surplus, num_transferable) {

    var ratio = _surplus * 1.0 / num_transferable
    var allocs = [...Array(counts.length)].fill(0)
    var _counts = [...counts]
    while(_surplus > 0) {
        
        var maxIndexes = []
        for(var i = 0; i < counts.length; i++) {
            _counts[i] *= ratio
            if(maxIndexes.length === 0 || _counts[maxIndexes[0]] === _counts[i]) {
                maxIndexes.push(i)
            } else if(_counts[maxIndexes[0]] < _counts[i]) {
                maxIndexes = []
                maxIndexes.push(i)
            }
        }

        var indexMaxValue = maxIndexes[0]
        if(maxIndexes.length > 1) {
            indexMaxValue = maxIndexes[Math.floor(Math.random() * maxIndexes.length)]
        }

        allocs[indexMaxValue] += 1
        counts[indexMaxValue] -= 1
        _counts = [...counts]
        _surplus -= 1
    }
    return allocs
}

function distributeWinnersVotes(lastCount, winnerIndex, quota, _votes, round) {

    var winnerSurplus = lastCount[winnerIndex] - quota
    if(round === 0) {
        var _parcel = []
        for(var i = 0; i < _votes.length; i++) {

            if(_votes[i][0] === winnerIndex && _votes[i].length > 1) {
                _parcel.push(_votes[i])
            }
        }

        var num_transferable = _parcel.length

        var sub_parcels_counts = [...Array(lastCount.length)].fill(0)
        for(var i = 0; i < _parcel.length; i++) {
            sub_parcels_counts[_parcel[i][1]] += 1
        }
        
        if(num_transferable > winnerSurplus) {
            
            var allocations = genVoteAllocations(sub_parcels_counts, winnerSurplus, num_transferable)
                      
            for(var i = 0; i < allocations.length; i++) {
                while(allocations[i] > 0) {
                    for(var j = 0; j < _votes.length; j++) {
                        
                        if(_votes[j].length > 1 && _votes[j][1] === i && _votes[j][0] === winnerIndex) {
                            _votes[j].shift()
                            break
                        }
                    }
                    allocations[i] -= 1
                }
            }

        } else if(num_transferable === winnerSurplus) {

            for(var i = 0; i < sub_parcels_counts.length; i++) {
                while(sub_parcels_counts[i] > 0) {
                    for(var j = 0; j < _votes.length; j++) {
                        
                        if(_votes[j].length > 1 && _votes[j][1] === i && _votes[j][0] === winnerIndex) {
                            _votes[j].shift()
                            break
                        }
                    }
                    sub_parcels_counts[i] -= 1
                }
            }

        } else {

            for(var i = 0; i < sub_parcels_counts.length; i++) {
                while(sub_parcels_counts[i] > 0) {
                    for(var j = 0; j < _votes.length; j++) {    
                        if(_votes[j].length > 1 && _votes[j][1] === i && _votes[j][0] === winnerIndex) {
                            _votes[j].shift()
                            break
                        }
                    }
                    sub_parcels_counts[i] -= 1
                }
            }
            var number_to_remove = winnerSurplus - num_transferable
            for(var i = 0; i < _votes.length; i++) {
                if(_votes[i][0] === winnerIndex && _votes[i].length === 1) {
                    _votes.splice(i, 1)
                }
            }
        }

        return _votes
       
    } else {
        var x = 0;
        for(var i = 0; i < _votes.length; i++) {
            if(_votes[i].length === 1 && _votes[i][0] === winnerIndex) {
                _votes.splice(i, 1)
                x += 1
            } else if(_votes[i][0] === winnerIndex) {
                _votes[i].shift()
                x += 1
            }

            if(x === winnerSurplus) {
                break
            }
        }

        return _votes
    }
}

function getValidRoundWinner(lastCount, round_winners, quota) {
    
    var largestSurplusCandidates = []

    for(var i = 0; i < round_winners.length; i++) {
        var _surplus = lastCount[round_winners[i]] - quota
        largestSurplusCandidates.push(_surplus)
    }

    var largestByIndex = []
    var largestDiff = largestSurplusCandidates[0]
    largestByIndex.push(0)

    for(var i = 1; i < largestSurplusCandidates.length; i++) {

        if(largestSurplusCandidates[i] === largestDiff) {
            largestByIndex.push(i)
        } else if(largestSurplusCandidates[i] > largestDiff) {
            largestDiff = largestSurplusCandidates[i] 
            largestByIndex = []
            largestByIndex.push(i)
        }
    }

    if(largestByIndex.length === 1) {
        return round_winners[largestByIndex[0]]
    } else {
        return round_winners[0]
    }
}

function getRoundLosers(lastCount, losers) {

    var _losers = []
    for(var i = 0; i < lastCount.length; i++) {

        var already_loser = false
        for(var j = 0; j < losers.length; j++) {
            if(losers[j] === i) {
                already_loser = true
            }
        }

        if(!already_loser) {
            if(_losers.length === 0) {
                _losers.push(i)
            } else if(lastCount[_losers[0]] === lastCount[i]) {
                _losers.push(i)
            } else if(lastCount[_losers[0]] > lastCount[i]) {
                _losers = []
                _losers.push(i)
            } 
        }
    }
    return _losers
}

function distributeLosersVotes(_votes, loserIndex) {

    for(var i = 0; i < _votes.length; i++) {
        for(var j = 0; j < _votes[i].length; j++) {

            if(_votes[i].length === 1 && _votes[i][j] === loserIndex) {
                _votes.splice(i, 1)
                i -= 1
                break
            } else if(_votes[i][j] === loserIndex) {
                _votes[i].splice(j, 1)
                break
            }
        }
    }

    return _votes
}

function removeIndexVotes(_votes, index) {
    for(var i = 0; i < _votes.length; i++) {

        if(_votes[i].length > 1) {
            for(var j = 1; j < _votes[i].length; j++) {
                if(_votes[i][j] === index) {
                    _votes[i].splice(j, 1)
                }
            }
        }
    }

    return _votes
}

function notWinner(winners, index, quota) {
    for(var i = 0; i < winners.length; i++) {
        if(index === winners[i]) {
            return false
        }
    }

    return true
}

function calculateSTVWinners(votes, num_Seats, num_Candidates) {

    var _votes = votes.sort((a, b) => {return a[0] < b[0] ? 1 : -1})
    var resultObj = {
        "quota" : null,
        "seats" : num_Seats,
        "candidates" : num_Candidates,
        "counts" : [],
        "winners": [],
        "losers" : []
    }

    /* Quota is calculated */
    var quota = calcDroopQuota(votes.length, num_Seats)
    resultObj.quota = quota

    var counts = []
    var initialCount
    
    initialCount = runCount(_votes, num_Candidates)
    counts.push(initialCount)

    /* Indexes of winners and losers of election in order of election or removal*/
    var winners = []
    var losers = []
    var round = 0

    while(winners.length < num_Seats) {
        
        if(num_Seats - winners.length === num_Candidates - winners.length - losers.length) {

            for(var i = 0; i < counts[counts.length - 1].length; i++) {

                if(counts[counts.length - 1][i] !== 0 && notWinner(winners, i, quota)) {
                    counts[counts.length - 1][i] = quota
                    winners.push(i)
                }
            }            
            
            break
        } else {
            var isWinner = isRoundWinner([...counts[counts.length - 1]], winners, quota)
            var nextCount = [...Array(num_Candidates)].fill(0)

            if(isWinner) {
                var roundWinners = getRoundWinners(counts[counts.length - 1], winners, quota)
                var validElected

                if(roundWinners.length > 1) {
                    validElected = getValidRoundWinner(counts[counts.length - 1], roundWinners, quota)
                } else {
                    validElected = roundWinners[0]
                }
                winners.push(validElected)

                if(counts[counts.length - 1][validElected] > quota) {
                    _votes = distributeWinnersVotes(counts[counts.length - 1], validElected, quota, _votes, round)
                }

                _votes = removeIndexVotes(_votes, validElected)

                counts.push(runCount(_votes, num_Candidates))
                round += 1

            } else {

                var roundLosers = getRoundLosers(counts[counts.length - 1], losers)

                var loserIndex
                if(roundLosers.length > 1) {
                    loserIndex = roundLosers[Math.floor(Math.random() * roundLosers.length)]
                } else {
                    loserIndex = roundLosers[0]
                }

                losers.push(loserIndex)

                _votes = distributeLosersVotes(_votes, loserIndex)
                counts.push(runCount(_votes, num_Candidates))
                round += 1

            }
        }
        _votes.sort((a, b) => {return a[0] < b[0] ? 1 : -1})

        
    }

    for(var i = 0; i < counts[counts.length - 1].length; i++) {
        if(counts[counts .length - 1][i] > 0 && counts[counts .length - 1][i] < quota) {
            counts[counts .length - 1][i] = 0
            losers.push(i)
        }
    }

    resultObj.counts = counts
    resultObj.winners = winners
    resultObj.losers = losers
    return resultObj

}

module.exports.calculateSTVWinners = calculateSTVWinners
