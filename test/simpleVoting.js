const Voting = artifacts.require("./Voting.sol");
const { getVoters, getCandidates } = require('../census');

const { VOTERS_ID, VOTERS_IDENTIFICATION, VOTERS_NAME } = getVoters(web3);

contract("Voting", accounts => {
  it("...should have deployed the instance.", async () => {
    const VotingInstance = await Voting.deployed();
    assert.ok(VotingInstance);
  });
  it("...should have stored the candidates.", async () => {
    const VotingInstance = await Voting.deployed();
    const { CANDIDATES } = getCandidates(web3);
    for(let i=0; i<CANDIDATES.length; i+=1) {
      await VotingInstance.addCandidate(CANDIDATES[i]);
    };
    const candidates = await VotingInstance.getCandidates();
    assert.equal(CANDIDATES.map((el) => web3.utils.hexToUtf8(el))[0],
                 candidates[1].map((el) => web3.utils.hexToUtf8(el))[0]);
    assert.equal(CANDIDATES.map((el) => web3.utils.hexToUtf8(el))[CANDIDATES.length],
                 candidates[1].map((el) => web3.utils.hexToUtf8(el))[candidates.length]);
  });
});
