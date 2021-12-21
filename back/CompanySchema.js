const { Schema, model } = require("mongoose");

// User Schema

module.exports = model(
  "Company",
  new Schema({

    company:{
      type:String,
      required: [true, "Please add company "],
    },
    email:{
        type:String,
        required: [true, "Please add email "],
      },
  })
);
