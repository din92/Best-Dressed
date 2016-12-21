"use strict";
var mongoose = require("mongoose");
var mylooksSchema = new mongoose.Schema({
  image:String,
  linkUrl:String,
  title:String,
  description:String,
  tags :[{
      type:String
  }],
  _creator:{
      type:mongoose.Schema.ObjectId,
      ref:"User"
  },
  email:String,
  username:String,
  createTime:{
      type:String,
       default:Date.now
  },
  view:{
      type:Number,
      default:0
  },
 upVotes:{
      type:Number,
      default:0
  }
})

module.exports = mongoose.model("mylooks",mylooksSchema);
