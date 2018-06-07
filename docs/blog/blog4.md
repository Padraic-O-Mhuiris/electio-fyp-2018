---
title:      Project Blog 4 | Deployer contract & Testing
layout:     post
date:       2018-02-01
image: /assets/images/markdown.jpg
headerImage: false
tag:
- Project
- Ethereum
category: blog
use_math: true
author: Patrick H Morris
description: Project proposal and investigation into Ethereum Blockchain
---

Much of this week was focused on developing the *deployer contract* which is used by participants of the system to both create and find elections. Along with this was figuring out how contracts are tested which took longer than extended.

## Deployer Contract

The structure of the election is defined by using the 'Election' struct object. Solidity allows for custom made types which is great for encapsulating the election into one object. The 'Election' we always refer to on the blockchain is the address of the voting contract.

```
struct Election {
    address _owner;
    bytes32 name;
    address contractRegistration;
    address contractVoting;
    uint createdAt;
    uint regStart;
    uint regFinished;
    uint voteStart;
    uint voteFinished;
    uint listPointer;
    uint userListPointer;
}
```

The base components of every election in this system are defined as above. Every election is stored in a mapping data structure, `mapping (address => Election) public elections`, mapping the voting contracts address to the election object.

Referencing the election's address we have two other data structures, `mapping (address => address[]) public userElections`, which maps the election owner's address to the election address. This is useful as the lookup time for an individuals election will be lessened. The other structure is a array object for all election address' created in the deployer contract.

During the development I found a useful [article](https://medium.com/@robhitchens/solidity-crud-part-2-ed8d8b4f74ec#.ekc22r5lf) which showed an implementation of how CRUD persistant storage functionality was used in a smart contract. My intention will be to add this functionality to the deployer contract with the restriction of updating and deletion of elections up to the registration start timestamp. The reason for this is that the ethos of the project is to have elections "set-in-stone" so to speak. The ability for an administrator to delete an election after the election would go against this ethos but in the event of an administrator poorly configuring an election, they could remove it if desired.

```
function newElection(
	bytes32 name,
	uint _regStart,
	uint _regFinish,
	uint _voteStart,
	uint _voteFinish
) 
	public 
{
	Registration r = new Registration(name, _regStart, _regFinish);
	Voting v = new Voting(name, _voteStart, _voteFinish, r);
        
	Election memory election = Election(
	msg.sender,
	name,
	r,
	v,
	block.timestamp,
	_regStart,
	_regFinish,
	_voteStart,
	_voteFinish,
	0,
	0);
        
	election.listPointer = electionList.push(v) - 1;
	elections[v] = election;
	election.userListPointer = userElections[msg.sender].push(v) - 1;
}
```

The `newElection()` function generates the Registration and Voting elections. As of now, both of these contracts are quite simple. The registration contract only serves as a list of valid and invalid voters for the election which the voting contract points to. The voting contract itself is subject to change due to multiple electoral systems being represented by this method. The current idea of implementing this is use inheritance from a general purpose voting contract which accepts a constructor argument for the type of supported election system to be used.

Both registration and voting contracts only accept their timestamps and the name of the election and are non-functional representations of the intended final product.

## Testing of Deployer

Prior to this week, I had dabbled in writing smart-contracts but I had never used truffle's mocha and chai javascripts functionality to test them. There was some but scarce documentation online. I initially began using the [truffle guidelines](http://truffleframework.com/docs/getting_started/javascript-tests) which I found quite awkward by the methods asynchronous calls were made.
Fortunately, this medium [post](https://medium.com/@angellopozo/testing-solidity-with-truffle-and-async-await-396e81c54f93) showed me how async/await can be used which makes testing far easier and clearer. 

```
beforeEach(async function() {
	deployer = await Deployer.new();
	await deployer.newElection(NAME, REG_S, REG_F, VOTE_S, VOTE_F)
     	electionAddr = await deployer.getUserElections()
 	election = await deployer.getElection(electionAddr)
	voting = await Voting.at(election[3])
	registration = await Registration.at(election[2])
})
```

For every test defined by `it("...", function() {})` the above `beforeEach()` function is ran which simulates the deployment of a new voting and registration contract. The constructor variables are predefined and are used to assert the correctness of arguments further on in the tests.

The two most important tests are defined below which test if the voting and registration contracts were deployed correctly.

```
// Checks if deployed voting contract matched inputs
it('... should generate Voting contract.', async function() {
	
	console.log("----- TEST 1 ----") 
    	console.log("Deployer:     " + deployer.address)
    	console.log("Voting:       " + voting.address)
    	console.log("Registration: " + registration.address)

    	assert.equal((await voting.getName()).substring(0,4), NAME_BYTES32, "Name is not correct")
    	assert.equal(await voting.getStart(), VOTE_S, "Voting Start Timestamp is not correct")
    	assert.equal(await voting.getEnd(), VOTE_F, "Voting End Timestamp is not correct")
    	assert.equal(await voting.getRegistration(), election[2], "Registration Address is not correct")

  })

// Checks if deployed registration contract matched inputs
it('... should generate Registration contract.', async function() {
    
    	assert.equal((await registration.getName()).substring(0,4), NAME_BYTES32, "Name is not correct")
    	assert.equal(await registration.getStart(), REG_S, "Registration Start Timestamp is not correct")
    	assert.equal(await registration.getEnd(), REG_F, "Registration Finish Timestamp is not correct")
  
})
```

## Next

The next thing to do is to implement the registration and voting contracts.


