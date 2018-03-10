var express = require("express");
var router = express.Router();
var Campground = require("../models/Campgrounds");
var middlewareObj = require("../middleware");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// Index page

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCamps){
        if(err){
            console.log(err);
            req.flash("error", "Failure to show camps.");
        } else{
            res.render("campgrounds/index", {camps:allCamps, page:'campgrounds'});
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
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCamp = {name:name, image:img, desc:desc, author:author, price:price, location:location, lat:lat, lng:lng};
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
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCamp = {name:req.body.name, image:req.body.image, desc:req.body.desc, price:req.body.price, location:location, lat:lat, lng:lng};
        Campground.findByIdAndUpdate(req.params.id, newCamp, function(err, editCamp) {
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