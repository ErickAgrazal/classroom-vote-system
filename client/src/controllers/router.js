const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const file = fs.readFileSync(path.join(__dirname, '..', 'contracts/Voting.json'));
const contract = JSON.parse(file);

const contractAddress = process.env.CONTRACT_ADDRESS;

router.get('/', (req, res) => {
    res.render('dashboard', { contractAddress });
});

router.get('/registrarse', (req, res) =>{
    res.render('register', { contractAddress });
});

router.get('/votar', async (req, res) => {
    res.render('vote', { contractAddress });
});

router.get('/reporte', async (req, res) => {
    res.render('report', { contractAddress });
});

router.get('/panel', async (req, res) => {
    res.render('panel', { contractAddress });
});

router.post('/api/contract', (req, res) => {
    res.json(contract).status(200);
});


module.exports = router;