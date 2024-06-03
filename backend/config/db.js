const mongoose = require("mongoose");

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongo");
    }catch(error){
        console.log("DB error:", error);
    }
    
};

module.exports = db;