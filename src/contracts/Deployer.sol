pragma solidity ^0.4.18;

import "./Registration.sol";
import "./Voting.sol";

contract Deployer {

    mapping (address => address[]) public userElections;
    mapping (address => Election) public elections;
    address[] public electionList;

    struct Election {
        address _owner;
        string name;
        address contractRegistration;
        address contractVoting;
        uint createdAt;
        uint system;
    }


    function isElection(address electionAddress) public constant
    returns (bool)
    {
        if(electionList.length == 0 || elections[electionAddress].createdAt == 0) {
            return false;
        } else {
            return true;
        }
    }


    function getElection(address electionAddress)
        public
        constant
    returns (
        address,
        string,
        address,
        address,
        uint,
        uint)
    {
        return (
            elections[electionAddress]._owner,
            elections[electionAddress].name,
            elections[electionAddress].contractRegistration,
            elections[electionAddress].contractVoting,
            elections[electionAddress].createdAt,
            elections[electionAddress].system
        );
    }


    function getAllElections() public constant returns (address[]) {
        return electionList;
    }


    function getUserElections() public constant returns (address[]) {
        return userElections[msg.sender];
    }


    function newElection(
        string name,
        uint _nomLimit,
        uint electionType,
        uint _numSeats
    )
        public
    {
        Registration r = new Registration(name, msg.sender, _nomLimit);
        Voting v = new Voting(name, r, msg.sender, electionType, _numSeats);

        Election memory election = Election(
            msg.sender,
            name,
            r,
            v,
            block.timestamp,
            electionType
            );

        elections[v] = election;
        electionList.push(v);
        userElections[msg.sender].push(v);
    }
}