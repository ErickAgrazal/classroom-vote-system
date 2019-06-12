pragma solidity ^0.5.8;

contract Ownable {
   address public owner;

   constructor () public{
       owner = msg.sender;
   }

   modifier onlyOwner {
       require(msg.sender == owner, "Votante no autorizado.");
       _;
   }
}


contract Voting is Ownable {
    // Candidates map
    uint8 candidatesListCounter = 0;
    uint8[9] private cantidateListId;
    bytes32[9] private cantidateListName;
    // Candidates utilities
    mapping(uint8 => uint8) candidateListVotes;
    mapping(bytes32 => bool) candidateValidator;

    // Voters map
    uint8[27] private votersListId;
    bytes32[27] private votersListIdentification;
    bytes32[27] private votersListName;
    bool[27] private votersListVoted;
    // Voters utilities
    mapping(bytes32 => address) private votersListAddressMap;
    mapping(bytes32 => bool) private votersListValidator;
    mapping(address => uint8) private votersListIdMap;

    // Voting starter and finisher
    bool votingIsOpen;

    // Events
    event AddedCandidate(bytes32 candidateStored);
    event AddedVote(bytes32 candidateName, uint8 candidateVotes);

    /**
     * Constructor. Initialize the voters.
     */
    constructor(uint8[27] memory _votersListId,
                bytes32[27] memory _votersListIdentification,
                bytes32[27] memory _votersListName) public {
        votersListId = _votersListId;
        votersListIdentification = _votersListIdentification;
        votersListName = _votersListName;
        for( uint8 i = 0 ; i < 27; i++){
            votersListValidator[votersListIdentification[i]] = false;
        }
    }

    /**
     * We will only be accepting one candidate. The validation is being
     * done using the candidate name.
     */
    modifier onlyNewCandidate(bytes32 _candidate){
        require(candidateValidator[_candidate] != true, "Candidato solo puede ser añadido una sola vez.");
        _;
    }
    modifier onlyValidVoter(bytes32 _voterIdentification){
        require(votersListValidator[_voterIdentification] != true, "Votante solo puede ser verificado una sola vez.");
        _;
    }

    function getCandidates() external view returns(uint8[9] memory, bytes32[9] memory) {
        return (cantidateListId, cantidateListName);
    }

    function getCandidatesVotes(uint8 _candidateId) external view onlyOwner returns(uint8) {
        return candidateListVotes[_candidateId];
    }

    function associateUserToAddress(bytes32 _voterIdentification) external onlyValidVoter(_voterIdentification) returns(address, bytes32) {
        votersListAddressMap[_voterIdentification] = msg.sender;
        votersListValidator[_voterIdentification] = true;
        return (msg.sender, _voterIdentification);
    }

    function addCandidate(bytes32 _candidate) external onlyNewCandidate(_candidate)  {
        // Storing candidate
        cantidateListId[candidatesListCounter] = candidatesListCounter;
        cantidateListName[candidatesListCounter] = _candidate;
        candidateListVotes[candidatesListCounter] = 0;

        // Adding the validator to true for next try
        candidateValidator[_candidate] = true;

        // Adds a new list counter for the next candidate
        candidatesListCounter = candidatesListCounter + 1;
        emit AddedCandidate(_candidate);
    }

    function vote(uint8 _candidateId, bytes32 _voterIdentification)  external {
        // Validadtions
        require(votingIsOpen == true, "Solo se puede votar cuando el tiempo de votación este activo.");
        require(votersListAddressMap[_voterIdentification] == msg.sender, "El votante solo puede votar usando una el address que validó.");
        require(votersListVoted[votersListIdMap[msg.sender]] == false, "Votante solo puede votar una vez.");

        // Incrementing voting count
        uint8 _candidateCount = candidateListVotes[_candidateId] + 1;

        // Removing the possibility for this voter to vote again
        votersListVoted[votersListIdMap[msg.sender]] = true;

        // Asigning the new votes to the candidate
        candidateListVotes[_candidateId] = _candidateCount;

        emit AddedVote(cantidateListName[_candidateId], _candidateCount);
    }

    function initializeVoting() external onlyOwner {
        votingIsOpen = true;
    }

    function finishVoting() external onlyOwner {
        votingIsOpen = false;
    }

    function getVotingStatus() external view returns(bool) {
        return votingIsOpen;
    }

    function() external payable {}
}