pragma solidity ^0.4.18;

contract Registration {

    string public nameElection;
    uint public begin;
    uint public end;
    address public owner;
    address public votingContract;
    uint public nominationLimit;

    mapping (address => Voter) public voters;
    mapping (address => Candidate) public candidates;

    address[] public applicantVoters;
    address[] public applicantCandidates;
    address[] public validVoters;
    address[] public inValidVoters;
    address[] public validCandidates;
    string[] public motions;

    struct Voter {
        address _voter;
        bool applied;
        bool checked;
        bool isValid;
        bool hasVoted;
        uint id_code;
        uint timeApplied;
        uint timeChecked;
        address nominated;
        uint ptr;
    }

    struct Candidate {
        address _candidate;
        string firstName;
        string lastName;
        address[] nominators;
        uint[] nominatedTimes;
        bool applied;
        uint timeApplied;
        bool isValid;
        uint ptr;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyValidVoter() {
        require(isValidVoter(msg.sender));
        _;
    }

    modifier onlyCandidate() {
        require(isValidCandidate(msg.sender));
        _;
    }

    modifier onlyVotingContract() {
        require(votingContract == msg.sender);
        _;
    }

    modifier inTime() {
        require(block.timestamp >= begin && block.timestamp <= end);
        _;
    }


    function Registration(string name, address admin, uint nomLimit) public {
        nameElection = name;
        owner = admin;
        nominationLimit = nomLimit;
    }


    function start(uint regStart, uint regEnd, address vc) public {

        if(end != 0) {
            revert();
        }

        begin = regStart;
        end = regEnd;
        votingContract = vc;
    }


    function getCounts()
        public
        constant
    returns(
        uint,
        uint,
        uint,
        uint,
        uint,
        uint
    ) {
        return (
            applicantVoters.length,
            applicantCandidates.length,
            validVoters.length,
            inValidVoters.length,
            validCandidates.length,
            motions.length
            );
    }


    function getVoter(address voter)
        public
        constant
    returns(
        address,
        address,
        uint,
        uint,
        uint
    ) {

        return (
            voters[voter]._voter,
            voters[voter].nominated,
            voters[voter].id_code,
            voters[voter].timeApplied,
            voters[voter].timeChecked
            );
    }


    function getVoterChecks(address voter)
        public
        constant
    returns (
        bool,
        bool,
        bool,
        bool
    ) {

        return (
            voters[voter].applied,
            voters[voter].checked,
            voters[voter].isValid,
            voters[voter].hasVoted
            );
    }


    function getCandidateName(address candidate)
        public
        constant
    returns(string, string) {

        return (
            candidates[candidate].firstName,
            candidates[candidate].lastName
            );
    }


    function getCandidate(address candidate)
        public
        constant
    returns (
        address,
        address[],
        uint[],
        bool,
        uint,
        bool
    ) {
        return (
            candidates[candidate]._candidate,
            candidates[candidate].nominators,
            candidates[candidate].nominatedTimes,
            candidates[candidate].applied,
            candidates[candidate].timeApplied,
            candidates[candidate].isValid
            );
    }


    function getNumVoters() public constant returns(uint) {
        return validVoters.length;
    }


    function getNumCandidates() public constant returns(uint) {
        return validCandidates.length;
    }


    function getCandidateByIndex(uint i) public constant returns(address) {
        return validCandidates[i];
    }


    function isAppliedVoter(address voter) public constant returns(bool) {
        if(voters[voter].applied) {
            return true;
        } else {
            return false;
        }
    }


    function isAppliedCandidate(address candidate) public constant returns(bool) {
        if(candidates[candidate].applied) {
            return true;
        } else {
            return false;
        }
    }


    function isValidVoter(address voter) public constant returns(bool) {
        if(voters[voter].isValid && validVoters[voters[voter].ptr] == voter) {
            return true;
        } else {
            return false;
        }
    }


    function isInValidVoter(address voter) public constant returns(bool) {
        if(!voters[voter].isValid && inValidVoters[voters[voter].ptr] == voter) {
            return true;
        } else {
            return false;
        }
    }


    function isValidCandidate(address candidate) public constant returns(bool) {
        if(candidates[candidate].isValid &&
           validCandidates[candidates[candidate].ptr] == candidate) {
            return true;
        } else {
            return false;
        }
    }


    function hasVoted(address voter) public constant returns (bool) {
        return voters[voter].hasVoted;
    }


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

    
    function addMotion(string _motion) public inTime onlyOwner {
        motions.push(_motion);
    }


    function registerAsCandidate(
        uint code,
        string fName,
        string lName
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


    function changeVoterStatus(address voter) public onlyVotingContract {
        voters[voter].hasVoted = true;
    }
}