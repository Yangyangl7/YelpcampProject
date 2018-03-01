var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");

// Landing page

router.get("/", function(req, res) {
    res.render("landing");
});


//==============
//Auth Routes
//==============

//Register Logic
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");   
        });
    });
});

//Login Logic
router.get("/login", function(req, res) {
    res.render("login");
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

module.exports = router;