"use strict";

var mongoose = require("mongoose");

var CommentSchema =  new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
        name:{
            type:String
        },
        email:{
            type:String
        }
    },
        lookId:{
            type:mongoose.Schema.ObjectId,
            ref:"mylooks"
        },
        gravatar:{
            type:String
        },
        comment:{
            type:String,
            trim:true
        },
        createTime:{
            type:Date,
            default:Date.now
        }
    
})

module.exports = mongoose.model("Comment",CommentSchema);