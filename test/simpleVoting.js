const Voting = artifacts.require("./Voting.sol");
const { getVoters, getCandidates } = require('../census');

const { VOTERS_IDENTIFICATION } = getVoters(web3);

contract("Voting contract", accounts => {
  it("...should have deployed the instance.", async () => {
    const VotingInstance = await Voting.deployed();
    assert.ok(VotingInstance);
  });
  it("...should have stored the candidates.", async () => {
    const VotingInstance = await Voting.deployed();
    const { CANDIDATES_NAME } = getCandidates(web3);
    const candidates = await VotingInstance.getCandidates();
    assert.equal(CANDIDATES_NAME.map((el) => web3.utils.hexToUtf8(el))[0],
                 candidates[1].map((el) => web3.utils.hexToUtf8(el))[0]);
    assert.equal(CANDIDATES_NAME.map((el) => web3.utils.hexToUtf8(el))[CANDIDATES_NAME.length],
                 candidates[1].map((el) => web3.utils.hexToUtf8(el))[candidates.length]);
  });
  it("...should not be able to let voters associate twice the same ID.", async () => {
    const VotingInstance = await Voting.deployed();
    await VotingInstance.associateUserToAddress(VOTERS_IDENTIFICATION[0]);
    try {
      await VotingInstance.associateUserToAddress(VOTERS_IDENTIFICATION[0]);
      assert.ok(false);
    } catch (error) {
      assert.ok(true);
    }
  });
  it("...should be able to initialize the voting process.", async () => {
    const VotingInstance = await Voting.deployed();
    await VotingInstance.initializeVoting();
    const votingStatus = await VotingInstance.getVotingStatus();
    assert.ok(votingStatus);
  });
  it("...should be able to finish the voting process.", async () => {
    const VotingInstance = await Voting.deployed();
    await VotingInstance.finishVoting();
    const votingStatus = await VotingInstance.getVotingStatus();
    assert.ok(!votingStatus);
  });
  it("...should be able to receive votes.", async () => {
    const VotingInstance = await Voting.deployed();
    const voterIdentification = VOTERS_IDENTIFICATION[1];
    const candidateId = 0;
    await VotingInstance.initializeVoting();
    await VotingInstance.associateUserToAddress(voterIdentification, { from: accounts[1] });
    await VotingInstance.vote(candidateId, voterIdentification, { from: accounts[1] });

    // If it gets to this point, it's fine!
    // Refactor is possible though... :D
    assert.ok(true);
  });
  it("...should be able to retrieve votes.", async () => {
    const AMOUNT_OF_VOTES_TO_THIS_POINT = 4;
    const VotingInstance = await Voting.deployed();
    await VotingInstance.initializeVoting();
    const VOTES = [
      { id: VOTERS_IDENTIFICATION[10], from: accounts[2], to: 0 },
      { id: VOTERS_IDENTIFICATION[11], from: accounts[3], to: 0 },
      { id: VOTERS_IDENTIFICATION[12], from: accounts[4], to: 0 },
      { id: VOTERS_IDENTIFICATION[13], from: accounts[5], to: 1 },
      { id: VOTERS_IDENTIFICATION[14], from: accounts[6], to: 1 },
      { id: VOTERS_IDENTIFICATION[15], from: accounts[7], to: 2 },
    ];

    // associateUserToAddress
    for(let i = 0; i < VOTES.length; i++){
      await VotingInstance.associateUserToAddress(VOTES[i].id, { from: VOTES[i].from });  
    }

    // Vote
    for(let i = 0; i < VOTES.length; i++){
      await VotingInstance.vote(VOTES[i].to, VOTES[i].id, { from: VOTES[i].from });
    }

    await VotingInstance.finishVoting();
    
    const resp = await VotingInstance.getCandidatesVotes( { from: accounts[0] });
    resp[0] = resp[0].map((el) => web3.utils.hexToUtf8(el));
    resp[1] = resp[1].map((el) => el.toNumber());

    // If it gets to this point, it's fine!
    // Refactor is possible though... :D
    // Refactored =D
    assert.equal(resp[1][0], AMOUNT_OF_VOTES_TO_THIS_POINT);
  });
});
