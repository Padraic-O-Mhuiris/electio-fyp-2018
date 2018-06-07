---
title:      Project Blog 5 | Registration & Voting
layout:     post
date:       2018-02-16
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

Since the last blog post the main focus was deriving the registration and voting contracts. The registration contract is as of this point in a functional state and as I imagine would not require much refactoring or changes as the project continues. The voting contract simulates the depositing of a large string of data into an array which acts as the election ballot box. This allows a voter to deposit once and only once but for other electoral systems, changes to the structure of a vote can be made.

## Registration Contract


```
	function Registration(bytes32 name, address admin, uint nomLimit) public {
        nameElection = name;
        owner = admin;
        nominationLimit = nomLimit;
    }
```

We instantiate the Registration contract from the deployer contract as we seen in the previous blog. An important note is the addition of the nomination limit and the removal of the start and stop timestamps of the election which is done later on.


```
	function start(uint regStart, uint regEnd, address vc) public {

        if(end != 0) {
            revert();
        }

        begin = regStart;
        end = regEnd;
        votingContract = vc;
    }
```
This start function is used by the administrator to begin the registration period.

```
	function registerAsVoter(uint code)
      public
      inTime
    {
        if(!isAppliedVoter(msg.sender)) {

            Voter memory vtr = Voter(
                msg.sender,
                true,
                false,
                false,
                false,
                code,
                block.timestamp,
                0,
                address(0),
                0);

            voters[msg.sender] = vtr;
            applicantVoters.push(msg.sender);

        } else {
            revert();
        }
    }
```
Anyone can apply to vote through the above function. Only allows addresses where the person has not already applied.


```
    function registerAsCandidate(
        uint code,
        bytes32 fName,
        bytes32 lName
    )
        public
        inTime
    {
        if(!isAppliedCandidate(msg.sender)) {

            if(!isAppliedVoter(msg.sender)){
              registerAsVoter(code);
            }

            address[] memory arr1;
            uint[] memory arr2;

            Candidate memory cdt = Candidate(
                msg.sender,
                fName,
                lName,
                arr1,
                arr2,
                true,
                block.timestamp,
                false,
                0);

            candidates[msg.sender] = cdt;
            applicantCandidates.push(msg.sender);

        } else {
            revert();
        }
    }
```
The process of registering as a candidate works the same with the exception of them providing information. This function also passes their address as a candidate.

```
	function validateVoter(address voter, uint code)
        public
        onlyOwner
        inTime
    {
        if(voters[voter].id_code == code) {
            voters[voter].ptr = validVoters.push(voter) - 1;
            voters[voter].checked = true;
            voters[voter].isValid = true;
            voters[voter].timeChecked = block.timestamp;
        } else {
            inValidateVoter(voter);
        }
    }


	function inValidateVoter(address voter)
        public
        onlyOwner
        inTime
    {
        voters[voter].ptr = inValidVoters.push(voter) - 1;
        voters[voter].checked = true;
        voters[voter].isValid = false;
        voters[voter].timeChecked = block.timestamp;
    }
```
The administrator then has the power to control who and who is not allowed to participate in the election process. The voter of the election is to provide their identification details to the administrator who then corresponds their information with the address and validates them as a 'valid voter'. By this method, the voter's anonymity is preserved and they are allowed participate. Where the voter is not a valid participant, their address is rejected.

```
	function nominateCandidate(address candidate)
        public
        onlyValidVoter
        inTime
    {
        if(isAppliedCandidate(msg.sender)) {
            revert();
        }

        if(voters[msg.sender].nominated == address(0)) {
            candidates[candidate].nominators.push(msg.sender);
            candidates[candidate].nominatedTimes.push(block.timestamp);
            voters[msg.sender].nominated = candidate;

            if(candidates[candidate].nominators.length >= nominationLimit) {
                candidates[candidate].ptr = validCandidates.push(candidate) - 1;
                candidates[candidate].isValid = true;
            }
        }
    }
```
The process of candidate nomination is more democratic. Once a voter is validated, they have the power to nominate a candidate. Once a candidate has reached the nomination limit, they are validated as valid candidates for the election. This could be further developed to allow different organisations or branches of government control over who gets nominated.

Other functions exist in the contract but are mostly getters and setters over certain voter and candidate flags and variables.

## Voting Contract

```
	function submitVote(string vote)
        public
        onlyValidVoter
        hasNotVoted
    {
        Vote memory vt = Vote(vote, block.timestamp);
        ballotBox.push(vt);
        registration.changeVoterStatus(msg.sender);
    }
```
The voting contract at this point is not as extrapolated as the registration contract is and at this point is hopefully only a crude example of the finished product. The above `submitVote()` function simply allows a person to submit a `string vote` to the `ballotBox array`. Strings in smart contracts are considered to be only preferred in cases where actual UTF-8 is represented and the variable `bytes` where raw data is used over 32 bytes. As the submission of a vote is just the raw data, I initially began using a `bytes` object which is just a `byte[]` in reality. This was problematic for shorter votes as representations of small values were not being outputted as inputted. Therefore I elected to use strings as the vote input type even though it is more expensive in terms of gas.

## Next
In the coming weeks of development I look to implement the local server and a crude first implementation of an election. The node server will allow the frontend make api-calls for access to more computationally complicated operations of the system.