const express = require("express");
const cors = require("cors");
const db = require("./db/db");
//const { readdirSync } = require("fs");
const api = require('./routes/transactions');

require("dotenv").config();

const app = express();



//middleware
app.use(express.json());
app.use(cors());

// //routes
// readdirSync("./routes").map((route) => {
//   app.use("/api/v1", require("./routes/" + route));
// });

app.use('/api/v1', api);

db();

module.exports = app;

