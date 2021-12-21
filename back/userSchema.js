const { Schema, model } = require("mongoose");

// User Schema

module.exports = model(
  "UserInfo",
  new Schema({

    name:{
      unique:true,
      type:String,
      required: [true, "Please add username "],
    },
    email:{
      type:String,
      unique:true,
      required: [true, "Please add username "],
    },
    password:{
      minlength:6,
      type:String,
      required: [true, "Please add password "],
    },
    date:{
      type:String,
    },
    role:{
      type:String,
      default:"Normal User"
    }
 
  
  })
);
