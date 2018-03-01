var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/Campgrounds");
var Comment = require("../models/Comment");
var middlewareObj = require("../middleware");

//Create Logic
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, findCamp){
        if (err){
            console.log(err);
            req.flash("error", "Cannot find the camp.");
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {camp:findCamp});
        }
    });
});

router.post("/", middlewareObj.isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, findCamp) {
        if (err){
            console.log(err);
            req.flash("error", "Cannot find the camp.");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                if (err) {
                    console.log(err);
                    req.flash("error", "Failure to create the comment.");
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    findCamp.posts.push(newComment._id);
                    findCamp.save();
                    req.flash("success", "Success to create a new comment.");
                    res.redirect("/campgrounds/" + req.params.id);    
                }
            });
        }
    });
});

//Edit Logic
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, findComment) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot find the comment.");
            res.redirect("back");
        } else {
            Campground.findById(req.params.id, function(err, findCamp) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Cannot find the camp.");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {camp:findCamp, comment:findComment});    
                }
            });
        }
    });
});

router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newComment){
       if (err) {
           console.log(err);
           req.flash("error", "Failure to update the comment.");
           res.redirect("back");
       } else {
           req.flash("success", "Success to edit the comment");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) ;
});

//Destroy Logic
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if (err) {
           console.log(err);
           req.flash("error", "Failure to delete the comment.");
           res.redirect("back");
       } else {
           req.flash("error", "Success to delete the comment.");
           res.redirect("back");
       }
   });
});


module.exports = router;