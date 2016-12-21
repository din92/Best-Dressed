"use strict"

var scrapers={};

scrapers["pinterest"]= require("./scraper/pinterest.js");
scrapers["imgur"]= require("./scraper/imgur.js");
module.exports.scrape = function(req,res){
    var url = req.body.url;
    var scraperTouse ;

    if(url.indexOf("pinterest")> -1){
        scraperTouse = "pinterest";
    }
    else if(url.indexOf("imgur")>-1){
        scraperTouse = "imgur";
    }
    else{
        console.log("Cannot locate scraper");
    }
    scrapers[scraperTouse].list(url,function(data){
        console.log("Data from scraper "+ scraperTouse, data);
        res.json(data);
    });
}