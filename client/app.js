require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const router = require('./src/controllers/router');

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// set routers
app.use('/', router);


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
