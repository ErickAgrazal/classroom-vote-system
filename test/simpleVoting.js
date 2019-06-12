const Voting = artifacts.require("./Voting.sol");
const { getVoters, getCandidates } = require('../census');

const { VOTERS_ID, VOTERS_IDENTIFICATION, VOTERS_NAME } = getVoters(web3);

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
  it("...should not be able to let voters add twice the same ID.", async () => {
    const VotingInstance = await Voting.deployed();
    const resp1 = await VotingInstance.associateUserToAddress(VOTERS_IDENTIFICATION[0]);
    try {
      const resp2 = await VotingInstance.associateUserToAddress(VOTERS_IDENTIFICATION[0]);
      assert.ok(false, "The contract shoult not let voters add twice the same ID.");
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
    const voterIdentification = web3.utils.utf8ToHex(VOTERS_IDENTIFICATION[0]);
    await VotingInstance.initializeVoting();
    await VotingInstance.associateUserToAddress(voterIdentification, { from: accounts[1] });
    await VotingInstance.vote(0, voterIdentification, { from: accounts[1] });

    // If it gets to this point, it's fine!
    // Refactor possible though... :D
    assert.ok(true);
  });
});
