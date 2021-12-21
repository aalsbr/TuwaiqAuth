const { Schema, model } = require("mongoose");

// User Schema

module.exports = model(
  "Orders",
  new Schema({

    company:{
      type:String,
      required: [true, "Please add username "],
    },
    email:{
      type:String,
      required: [true, "Please add username "],
    },
    phone:{

      type:String,
      required: [true, "Please add password "],
    },
     url:{
      type:String,
      required: [true, "Please add url "],
    },
    
    status:{
      type:String,
      default: "pending"
    }

 
  
  })
);
