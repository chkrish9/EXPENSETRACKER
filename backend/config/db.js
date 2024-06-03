const mongoose = require("mongoose");
const { logEvents } = require('../middleware/logger')

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongo");
    }catch(error){
        logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrLog.log')
    }
    
};

module.exports = db;