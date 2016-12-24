"use strict"
var Comment = require("./comment.model");

module.exports.postComment = function(req,res){
    var newComment = new Comment();
  newComment.author.id = req.body.authorId;
  newComment.author.name = req.body.authorName;
  newComment.author.email = req.body.authorEmail;
  newComment.gravatar = req.body.gravatar;
  newComment.comment = req.body.comment;
  newComment.lookId = req.body.lookId;
  newComment.createTime = Date.now();

  newComment.save(function(err, comment) {
    if (err) {
      console.log('error saving comment');
      return res.send(500);
    } else {
      console.log(comment);
      console.log('Comment saved to DB');
      res.status(200)
        .json(comment);
    }
  });
}

module.exports.getComments = function(req,res){
    console.log("getting comments for look");
    Comment.find({
        lookId:req.params.id
    })
    .sort({
      createTime: -1
    })  
    .exec(function(err,comments){
         if (err) {
             console.log("Error in getting comments "+err)
             res.status(500).json(err);
    }
    if (!comments) {
      console.log("No comments found ")
             res.status(400)
    }
    return res.status(200)
      .json(comments);
    })
}