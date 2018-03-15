var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");
var Campground = require("../models/Campgrounds");

// Landing page

router.get("/", function(req, res) {
    res.render("landing");
});


//==============
//Auth Routes
//==============

//Register Logic
router.get("/register", function(req, res) {
    res.render("register", {page:'register'});
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username, password:req.body.password, lastName:req.body.lastname, 
                            firstName:req.body.firstname, email:req.body.email, 
                            bio:req.body.bio, avator:req.body.avator});
    
    if (req.body.adminCode === "adminCode0725") {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            if (req.user.isAdmin) {
                req.flash("success", "Welcome to Yelpcamp administer: " + user.username);
                res.redirect("/campgrounds");
            } else {
                req.flash("success", "Welcome to Yelpcamp " + user.username);
                res.redirect("/campgrounds");   
            }
        });
    });
});

//Login Logic
router.get("/login", function(req, res) {
    res.render("login", {page:'login'});
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res) {
});

//Logout Page
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "Successfully logged out.");
    res.redirect("/campgrounds");
});

//===================
//User Profile Routes
//===================

router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
      if (err) {
          req.flash("error", "something going wrong.");
          res.redirect("/");
      }
      else {
          Campground.find().where("author.id").equals(user._id).exec(function(err, camps){
             if (err) {
                req.flash("error", "something going wrong.");
                res.redirect("/");
             }
             else {
                res.render("users/show", {user:user, camps:camps});       
             }
          });
      }
  });
});
 

module.exports = router;