// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CampusVote {
    address public admin;
    string public electionName; // <--- ADD THIS

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public hasVoted;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    bool public electionEnded;

    constructor(string memory _electionName) {
        admin = msg.sender;
        electionName = _electionName; // <--- SET HERE
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(!electionEnded, "Election ended");
        require(_candidateId < candidatesCount, "Invalid ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function endElection() public onlyAdmin {
        electionEnded = true;
    }

    function getCandidate(uint _id) public view returns (string memory, uint) {
        Candidate memory c = candidates[_id];
        return (c.name, c.voteCount);
    }
}
