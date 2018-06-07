var request = require('request-promise');
var querystring = require('querystring');
const serverAddress = "http://localhost:5000/"

function NetIdHelper(id) {
    var netName = ''
    switch (id) {
        case 1:
          netName = "Main"
          break
        case 2:
          netName = "Morden"
          break
        case 3:
          netName = "Ropesten"
          break
        case 4:
          netName = "Rinkeby"
          break
        case 42:
          netName = "Kovan"
          break
        default:
          netName = "Unknown"
    }
    return netName;
}

function calculateVoteNumeric(candidateIndex, numVoters) {

  if(candidateIndex == 0) {
    return 1
  }

  var x = 1;
  while(x <= numVoters) {
    x = x << 1;
  }

  return x ** candidateIndex
}

function calculateWinner(tally, numVoters, numCandidates) {

  var offset = calculateVoteNumeric(1, numVoters)
  offset = offset.toString(2).length - 1
  var diff = (offset * numCandidates) - tally.length
  if(diff > 0) {
    var str = new Array(diff + 1).join('0');
    tally = str + tally
  } else if(diff === 0) {
    
  }

  var arr = []
  for(var i = tally.length; i > 0; i -= offset) {
    var x = parseInt(tally.substring(i - offset, i), 2)
    arr.push(x)
  }

  var obj = []
  for(var j = 0; j < arr.length; j++) {
    obj[j] = {"index": j, "votes": arr[j]}
  }

  var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
    };
  };
  return obj.sort(sortByProperty('votes'))
}

async function getPBK(electionID) {

  var options = {
    "method":"GET",
    "uri":serverAddress + 'api/pbk/' + (electionID.toLowerCase()),
    "json":true
  }

  var pbk

  pbk = await request(options).then(function(body) {
    return body
  }).catch(function (err) {
    console.log('Could not find Public Key');
  })

  return pbk
}

async function getPVK(electionID) {

  var options = {
    "method":"GET",
    "uri":serverAddress + 'api/pvk/' + (electionID.toLowerCase()),
    "json":true
  }

  var pvk

  pvk = await request(options).then(function (body) {
    return body
  }).catch(function (err) {
    console.log('Could not find Public Key');
  });

  return pvk
}

async function genKey(electionID) {

  var obj = { 'election': (electionID.toLowerCase()) }

  var options = {
    "method": "POST",
    "uri": serverAddress + 'api/genKey',
    "body": obj,
    "json": true
  }

  await request(options)
    .then(function (body) {
      return true
    }).catch(function (err) {
      return false()
    });
}

async function encrypt(vote, pbk) {

  var obj = { vote, pbk }

  var options = {
    "method": "POST",
    "uri": serverAddress + 'api/encrypt/',
    "body": obj,
    "json": true
  }

  var encryptedVote
  await request(options)
    .then(function (body) {
      encryptedVote = body
  }).catch(function (err) {
  });

  return encryptedVote
}

async function decrypt(hash, pbk, pvk) {
  
  var obj = { hash, pbk, pvk }

  var options = {
    "method": "POST",
    "uri": serverAddress + 'api/decrypt/',
    "body": obj,
    "json": true
  }

  var decryptedVote
  await request(options)
    .then(function (body) {
      decryptedVote = body
  }).catch(function (err) {
    console.log(err)
    console.log('Could not decrypt vote');
  });

  return decryptedVote
}

async function tally(votes, pbk) {

  var obj = { votes, pbk}

  var options = {
    "method": "POST",
    "uri": serverAddress + 'api/tally/',
    "body": obj,
    "json": true
  }

  var tally
  await request(options)
    .then(function (body) {
      tally = body
  }).catch(function (err) {
    console.log(err)
    console.log('Could not tally votes');
  });

  return tally
}

function weightedRandom(min, max) {
  return Math.round(max / (Math.random() * max + min));
}

function shuffle(array) {
  
  for(var i = 0; i < array.length; i++) {
    var j = weightedRandom(0, array.length - 1) % array.length
    
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

function calculateSTVNumeric(choices) {
  var vote = "1"

  for(var i = 0; i < choices.length; i++) {
    if(choices[i] < 10) {
        vote = vote + "0" + choices[i]
    } else {
        vote = vote + choices[i]
    }
  }

  return parseInt(vote, 10)
}

function genSTVMockVotes(num_candidates) {
  var _vote = shuffle(([...Array(num_candidates + 1).keys()]).slice(0, num_candidates));
  var _rand = Math.floor(Math.random() * (num_candidates))
  if(_rand === 0) {
  } else {
    _vote = _vote.slice(0, _rand)
  }

  return _vote
}

function sleep(s) {
  var ms = s * 1000
  return new Promise(resolve => setTimeout(resolve, ms));
}

function now() {
  return Math.round((new Date()).getTime() / 1000)
}

async function waitTillTime(end) {

  if(now() <= end) {
    console.log("WAITING        :: " + (end - now()))
    await sleep((end - now()) + 0.5)
  }
}

async function setMotions(registration, accounts, numVoters) {
  for(var j = 1; j < numVoters; j++) {
      await registration.registerAsVoter(j, {from: accounts[j]})
      await registration.validateVoter(accounts[j], j)
  }

  await registration.addMotion("Yes")
  await registration.addMotion("No")
}

async function setRegister(registration, accounts, numVoters) {
  for(var j = 1; j < numVoters; j++) {
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

async function makeVotes(voting, accounts, pbk, numVoters) {
  for(var j = 1; j < numVoters; j++) {

      var n = j % 2
      if(n === 1) {
          var vote = await encrypt((calculateVoteNumeric(0, numVoters).toString(2)), pbk)
          await voting.submitVote(vote, {from: accounts[j]})
      } else if(n === 0) {
          var vote = await encrypt((calculateVoteNumeric(1, numVoters).toString(2)), pbk)
          await voting.submitVote(vote, {from: accounts[j]})
      }
  }
}

async function setRegisterSTV(registration, accounts, numVoters) {
  for(var j = 1; j < numVoters; j++) {
      if(j === 1) {
          await registration.registerAsCandidate(1, 'Patrick', 'Swayze', {from: accounts[1]})
          await registration.validateVoter(accounts[1], 1)
      } else if(j === 2) {
          await registration.registerAsCandidate(2, 'Daniel', 'Craig', {from: accounts[2]})
          await registration.validateVoter(accounts[2], 2)
      } else if(j === 3) {
          await registration.registerAsCandidate(3, 'Tom', 'Cruise', {from: accounts[3]})
          await registration.validateVoter(accounts[3], 3)
      } else if(j === 4) {
          await registration.registerAsCandidate(4, 'Brad', 'Pitt', {from: accounts[4]})
          await registration.validateVoter(accounts[4], 4)
      } else if(j === 5) {
          await registration.registerAsCandidate(5, 'George', 'Clooney', {from: accounts[5]})
          await registration.validateVoter(accounts[5], 5)
      } else if(j === 6) {
          await registration.registerAsCandidate(6, 'Anthony', 'Hopkins', {from: accounts[6]})
          await registration.validateVoter(accounts[6], 6)
      } else {  
          await registration.registerAsVoter(j, {from: accounts[j]})
          await registration.validateVoter(accounts[j], j)

          if(j < 13) {
              await registration.nominateCandidate(accounts[j - 6], {from: accounts[j]})
          }
      }
  }
}

async function makeVotesSTV(voting, accounts, pbk, numVoters, numCandidates) {
  for(var j = 1; j < numVoters; j++) {
      var choices = genSTVMockVotes(parseInt(numCandidates, 10))
      var vote = await encrypt((calculateSTVNumeric(choices)).toString(2), pbk)
      
      await voting.submitVote(vote, {from: accounts[j]})
  }
}



module.exports.NetIdHelper = NetIdHelper;
module.exports.calculateVoteNumeric = calculateVoteNumeric;
module.exports.calculateWinner = calculateWinner;
module.exports.getPBK = getPBK;
module.exports.getPVK = getPVK;
module.exports.genKey = genKey;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.tally = tally;
module.exports.sleep = sleep;
module.exports.now = now;
module.exports.calculateSTVNumeric = calculateSTVNumeric;
module.exports.genSTVMockVotes = genSTVMockVotes;
module.exports.waitTillTime = waitTillTime;
module.exports.setRegisterSTV = setRegisterSTV;
module.exports.makeVotesSTV = makeVotesSTV;
module.exports.setRegister = setRegister;
module.exports.makeVotes = makeVotes;
module.exports.setMotions = setMotions;
