"use script"
var fs = require("fs");
var request= require("request");
var cheerio = require("cheerio");
module.exports.list= function(url,cb){
    request(url,function(error,resp,body){
         if(error){
            cb({
                error:error
            });
         }
         if(!error){
          
             var $ = cheerio.load(body);
             var pin = {};
             var $url = url;
             var $img = $('.heightContainer img').attr('src');
            var $desc = $('.heightContainer img').attr('alt');
             console.log("The image caught:"+$img +" "+ url);

             var pin={
                 img:$img,
                 url:$url,
                 desc:$desc
             }
             cb(pin);
         }
    })
}
