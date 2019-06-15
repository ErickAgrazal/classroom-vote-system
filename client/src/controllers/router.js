const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const file = fs.readFileSync(path.join(__dirname, '..', 'contracts/Voting.json'));
const contract = JSON.parse(file);

router.get('/', (req, res) => {
    res.render('dashboard');
});

router.get('/registrarse', (req, res) =>{
    res.render('register');
});

router.get('/votar', async (req, res) => {
    res.render('vote');
});

router.get('/panel', async (req, res) => {
    res.render('panel');
});

router.post('/api/contract', (req, res) => {
    res.json(contract).status(200);
});


module.exports = router;