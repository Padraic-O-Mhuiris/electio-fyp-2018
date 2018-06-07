pragma solidity ^0.4.18;

import "./Registration.sol";

contract Voting {

    string public nameElection;
    uint public begin;
    uint public end;
    uint public numCandidates;
    uint public numVoters;
    uint public numSeats;
    address public owner;
    Registration public registration;

    PublicKey public publickey;
    PrivateKey public privatekey;

    uint public electoralSystem;

    Vote[] public ballotBox;

    struct Vote {
        string vote;
        uint timestamp;
    }

    struct PublicKey {
        string n;
        string nSquared;
        string g;
        uint bits;
    }

    struct PrivateKey {
        string lambda;
        string denom;
    }

    struct ElectionCandidate {
        address _candidate;
        uint ptr;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyValidVoter() {
        require(registration.isValidVoter(msg.sender));
        _;
    }

    modifier hasNotVoted() {
        require(!registration.hasVoted(msg.sender));
        _;
    }

    modifier inTime() {
        require(block.timestamp >= begin && block.timestamp <= end);
        _;
    }

    modifier postVoting() {
        require(block.timestamp > end && end != 0);
        _;
    }


    function Voting(
        string name,
        address reg,
        address admin,
        uint _electionType,
        uint _numSeats
    )
        public
    {
        require(_electionType < 3);
        nameElection = name;
        registration = Registration(reg);
        owner = admin;
        electoralSystem = _electionType;
        numSeats = _numSeats;
    }


    function start(
        uint voteStart,
        uint voteEnd,
        string n,
        string nSquared,
        string g,
        uint bits
    )
      public
      onlyOwner
    {

        if(block.timestamp < registration.end()) {
            revert();
        }

        begin = voteStart;
        end = voteEnd;
        publickey.n = n;
        publickey.nSquared = nSquared;
        publickey.g = g;
        publickey.bits = bits;

        numCandidates = registration.getNumCandidates();
        numVoters = registration.getNumVoters();
    }


    function getNumberVotes() public constant returns(uint) {
        return ballotBox.length;
    }

    function publishPrivateKey(
        string lambda,
        string denom
    )
        public
        onlyOwner
        postVoting
    {
        privatekey.lambda = lambda;
        privatekey.denom = denom;
    }


    function submitVote(string vote)
        public
        onlyValidVoter
        hasNotVoted
    {
        Vote memory vt = Vote(vote, block.timestamp);
        ballotBox.push(vt);
        registration.changeVoterStatus(msg.sender);
    }
}