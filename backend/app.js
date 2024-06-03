const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const api = require('./routes/transactions');

require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use('/api/v1', api);

db();

module.exports = app;

