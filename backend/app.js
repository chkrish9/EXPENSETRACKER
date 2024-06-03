const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const path = require('path')
const corsOptions = require('./config/corsOptions')
const api = require('./routes/transactions');

require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/api/v1', api);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

db();

module.exports = app;

