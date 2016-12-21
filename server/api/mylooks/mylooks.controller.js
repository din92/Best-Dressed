"use strict"

var _ = require("lodash");
var Look = require("./mylooks.model");
var path = require("path");
var utils = require("../../utils/utils.js");

module.exports.scrapeUpload = function (req, res) {
    console.log("Ready to upload scrape");
    var random = utils.randomizer(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    //utils.downloadURI(req.body.image,'../client/assets/images/uploads/' + random + '.png',function(filename){
    utils.downloadURI(req.body.image, './client/assets/images/uploads/' + random + '.png', function (filename) {
        //console.log(done);
        var newLook = new Look();
        newLook.title = req.body.title;
        newLook.email = req.body.email;
        newLook.linkURL = req.body.linkURL;
        newLook.description = req.body.description;
        newLook.userName = req.body.name;
        newLook._creator = req.body._creator;
        newLook.createTime = Date.now();
        newLook.upVotes = 0;
        newLook.image = filename.slice(9);
        newLook.save(function (err, look) {
            if (err) {
                console.log("Error in saving look to the server");
            }
            else {
                console.log("look is saved to the server");
                console.log(look);
                res.status(200).json(look);
            }
        })
    })
}

module.exports.allLooks = function (req, res) {
    console.log("Inside GetAllLooks");
    Look.find({})
        .sort({
            createTime: -1
        })
        .exec(function (err, looks) {
            if (err) {
                console.log("Error occured in saving looks " + err);
                res.status(500).json(err);
            }
            else if (!looks) {
                res.status(404).json({ "message": "NO looks found" });
            }
            else {
                console.log("looks found");
                res.status(200).json(looks);
            }
        })
}
module.exports.fileUpload = function (req, res) {
    console.log("Ready to upload file");
    var fileimage = req.middlewareStorage.fileimage;
    //console.log(done);
    var newLook = new Look();
    newLook.image = "/assets/images/uploads/" + fileimage;
    newLook.title = req.body.title;
    newLook.email = req.body.email;
    newLook.linkURL = req.body.linkURL;
    newLook.description = req.body.description;
    newLook.userName = req.body.name;
    newLook._creator = req.body._creator;
    newLook.createTime = Date.now();
    newLook.upVotes = 0;
    newLook.save(function (err, look) {
        if (err) {
            console.log("Error in saving look to the server");
        }
        else {
            console.log("look is saved to the server");
            console.log(look);
            res.status(200).json(look);
        }
    })

}
