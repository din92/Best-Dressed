"use strict"

var express = require("express");
var looksCtrl = require("./mylooks.controller");
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post("/scrapeUpload",auth.isAuthenticated(),looksCtrl.scrapeUpload);
router.post("/upload",auth.isAuthenticated(),looksCtrl.fileUpload);

router.get("/getAllLooks",looksCtrl.allLooks);

module.exports=router;