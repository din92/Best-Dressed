"use strict"

var express = require("express");
var commentCtrl = require("./comment.controller");
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post("/", commentCtrl.postComment);
router.get("/:id", commentCtrl.getComments);



module.exports = router;