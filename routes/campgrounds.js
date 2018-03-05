var express = require("express");
var router = express.Router();
var Campground = require("../models/Campgrounds");
var middlewareObj = require("../middleware");

// Index page

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCamps){
        if(err){
            console.log(err);
            req.flash("error", "Failure to show camps.");
        } else{
            res.render("campgrounds/index", {camps:allCamps});
        }
    });
});

// Post operation, add a new camp to the db
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("campgrounds/new"); 
});

router.post("/", middlewareObj.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCamp = {name:name, image:img, desc:desc, author:author, price:price};
    Campground.create(newCamp, function(err, newCamp){
        if(err){
            console.log(err);
            req.flash("error", "Failure to create the camp.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Success to create a new camp.");
            res.redirect("/campgrounds");
        }
    });
});

// the Show page

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("posts").exec(function(err, findCamp){
        if (err) {
            console.log(err);
            req.flash("error", "Cannot to find the camp.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {camps: findCamp});
        }
    });
});

//Edit logic
router.get("/:id/edit", middlewareObj.checkCampOwnership, function(req, res) {
     Campground.findById(req.params.id, function(err, findCamp) {
        if(err) {
            console.log(err);
            req.flash("error", "Cannot to find the camp.");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("campgrounds/edit", {camps:findCamp});
        }
     });
});

router.put("/:id", middlewareObj.checkCampOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, editCamp) {
        if(err) {
            console.log(err);
            req.flash("error", "Failure to edit the camp.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Success to edit the camp.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy Logic
router.delete("/:id", middlewareObj.checkCampOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
            req.flash("error", "Failure to delete the camp.");
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Success to delete the camp.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;