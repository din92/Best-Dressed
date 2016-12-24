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

module.exports.getUserLooks = function(req,res){
    Look.find({
        email:req.params.id
    })
    .sort({
        createTime:-1
    })
    .exec(function(err,look){
        if(err){
            console.log("Error in finding user looks "+err);
            res.status(400).json(err);
        }
        else if (!look) {
                res.status(404).json({ "message": "NO looks found" });
            }
        else{
            console.log("User looks found");
            res.status(200).json(look);
        }
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
            res.status(200).json(look);
        }
    })

}
module.exports.singleLook = function (req, res) {
    Look.findById(req.params.lookId)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in finding look for "+req.params.lookId+" Error: " + err);
                res.status(400).json(err);
            }
            else if (!look) {
                return res.send(404);
            }
            else {
                console.log("Look found");
                res.status(200).json(look);
            }
        })
}
module.exports.getUpdateLook = function(req,res){
     Look.findById(req.params.lookId)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in finding look for "+req.params.lookId+" Error: " + err);
                res.status(400).json(err);
            }
            else if (!look) {
                return res.send(404);
            }
            else {
                console.log("Look found");
                res.status(200).json(look);
            }
        })
}
exports.popLooks = function(req, res) {
  Look.find({email:req.params.id})
    .sort('-upVotes')
    .limit(6)
    .exec(function(err, looks) {
      if (err) {
         console.log("Error in finding look for "+req.params.id+" Error: " + err);
                res.status(400).json(err);
      }
      console.log(looks);
      return res.json(looks);
    });
}
module.exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Look.findById(req.params.id)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in finding look " + err);
                res.status(400).json(err);

            }
            else if (!look) {
                console.log("Look not found");
                res.status(404).json({ "message": "Look not found for updating" });
            }
            else {
                var updated = _.merge(look, req.body);
                updated.save(function (err, updatedLook) {
                    if (err) {
                        console.log("Error in updating look " + err);
                        res.status(403).json(err);
                    }
                    else {
                        console.log("look updated");
                        res.status(204).json(updatedLook);
                    }
                })
            }
        })
}

module.exports.deleteLook = function (req, res) {
    Look.findByIdAndRemove(req.params.id)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in deleting look " + err);
                res.status(400).json(err)
            }
            else if (!look) {
                console.log("No look found to delete");
                res.status(404).json({ "message": "No look to delete" });
            }
            else {
                console.log("Look deleted");
                res.status(200).json(look);
            }
        })
}

module.exports.addView = function (req, res) {
    Look.findById(req.params.id)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in finding look " + err);
                res.status(400).json(err);

            }
            else if (!look) {
                console.log("Look not found");
                res.status(404).json({ "message": "Look not found for updating" });
            }
            else {
                look.view++;
                look.save(function (err, updatedLook) {
                    if (err) {
                        console.log("Error in updating view for look " + err);
                        res.status(403).json(err);
                    }
                    else {
                        console.log("view for look updated");
                        res.status(204).json(updatedLook);
                    }
                })
            }
        })
}
module.exports.upVote = function (req, res) {
    Look.findById(req.params.id)
        .exec(function (err, look) {
            if (err) {
                console.log("Error in finding look " + err);
                res.status(400).json(err);

            }
            else if (!look) {
                console.log("Look not found");
                res.status(404).json({ "message": "Look not found for updating" });
            }
            else {
                look.upVotes++;
                look.save(function (err, updatedLook) {
                    if (err) {
                        console.log("Error in updating upvotes for look " + err);
                        res.status(403).json(err);
                    }
                    else {
                        console.log("upVotes for look updated");
                        res.status(204).json(updatedLook);
                    }
                })
            }
        })
}
