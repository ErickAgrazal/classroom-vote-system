const path = require('path');
const fs = require('fs');

const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const file = fs.readFileSync(path.join(__dirname, '..', 'contracts/Voting.json'));
const contract = JSON.parse(file);
const { abi } = contract;
const VotingContract = web3.eth.Contract(abi, contract.networks['1559955224305'].address);



router.get('/registrarse', (req, res) =>{
    res.render('register');
});

router.get('/votar', async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    let candidates = [];
    try{
        const resp = await VotingContract.methods.getCandidates().call({from:accounts[0]});
        console.log(resp);
        for(i=0; i<resp['0'].length; i++ ){
            candidates.push({name: resp['0'][i], id: resp['1'][i]});
        }
    }
    catch(e){
        console.log(e);
        candidates.push({});
    }
    res.render('vote', { candidates });
});

router.post('/api/contract', (req, res) => {
    console.log(contract);
    res.json(contract).status(200);
});


module.exports = router;