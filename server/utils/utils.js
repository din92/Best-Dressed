"use strict"
var fs = require("fs");
var request = require("request");
module.exports.downloadURI = function(url,filename,callback){
    console.log("Writing the image into the uploads folder");
    request(url)
    .pipe(fs.createWriteStream(filename))
    .on("close",function() {
        callback(filename);
        console.log(filename);
    })
}

module.exports.randomizer = function(length,chars){
    var result = "";
    for(var i =length;i>0;--i) result += chars[Math.round(Math.random()* (chars.length-1))];
    return result;
}