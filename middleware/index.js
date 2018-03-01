var Comment = require("../models/Comment");
var Campground = require("../models/Campgrounds");

var middlewareObj = {
    checkCommentOwnership: function (req, res, next){
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, findComment) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Cannot find the comment.");
                    res.redirect("back");
                } else {
                    if(findComment.author.id.equals(req.user._id)) {
                         next();
                    } else {
                        req.flash("error", "You do not have the permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "Please be Logged in first.");
            res.redirect("/login");
        }
    },
    checkCampOwnership: function(req, res, next){
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, findCamp) {
                if(err) {
                    console.log(err);
                    req.flash("error", "Cannot find the camp.");
                    res.redirect("back");
                } else { 
                    if(findCamp.author.id.equals(req.user._id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have the permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "Please be Logged in first.");
            res.redirect("/login");
        }
    },
    isLoggedIn: function(req, res, next){
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash("error", "Please be Logged in first.");
      return res.redirect("/login");
    }
};

module.exports = middlewareObj;