var Voting = artifacts.require("./Voting.sol");
const { getVoters, getCandidates } = require('../census');

module.exports = function(deployer) {
  const { VOTERS_ID, VOTERS_IDENTIFICATION, VOTERS_NAME } = getVoters(web3);
  const { CANDIDATES_ID, CANDIDATES_NAME } = getCandidates(web3);
  deployer.deploy(Voting, VOTERS_ID, VOTERS_IDENTIFICATION, VOTERS_NAME, CANDIDATES_ID, CANDIDATES_NAME).then(function() {
    console.log('Worked!');
  }).catch(function(e){
    console.log(`Failed!: ${e}`);
  });
};
