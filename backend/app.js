const express = require("express");
const cors = require("cors");
const path = require('path')
const cookieParser = require('cookie-parser')

const corsOptions = require('./config/corsOptions')
const routes = require('./routes');
const db = require("./config/db");
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

require("dotenv").config();

const app = express();

db();

//middleware
app.use(logger)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/api/v1', routes);

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

app.use(errorHandler)

module.exports = app;

