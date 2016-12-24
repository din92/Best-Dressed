"use strict"

var express = require("express");
var looksCtrl = require("./mylooks.controller");
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post("/scrapeUpload",auth.isAuthenticated(),looksCtrl.scrapeUpload);
router.post("/upload",auth.isAuthenticated(),looksCtrl.fileUpload);
router.put("/:id",auth.isAuthenticated(),looksCtrl.update);
router.put("/addView/:id",auth.isAuthenticated(),looksCtrl.addView);
router.put("/upvote/:id",auth.isAuthenticated(),looksCtrl.upVote)

router.get("/getAllLooks",looksCtrl.allLooks);
router.get("/getUserLooks/:id",looksCtrl.getUserLooks);
router.get("/:lookId",looksCtrl.singleLook);
router.get("/updateLook/:lookId",looksCtrl.getUpdateLook);
router.get('/popLooks/:id', looksCtrl.popLooks);
router.delete("/:id",looksCtrl.deleteLook);


module.exports=router;