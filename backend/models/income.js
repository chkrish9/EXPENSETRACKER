const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      require: true,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
      require: true,
    },
    date: {
      type: Date,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    subCategory: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    user:{
      type: String,
      require: true,
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);