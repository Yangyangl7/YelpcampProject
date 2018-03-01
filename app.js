var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride  =  require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var Campground = require("./models/Campgrounds");
var Comment = require("./models/Comment");
var User = require("./models/User");
var seedDB = require("./seed");

//Routers Config

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//Config

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
//seedDB();

//Passport configuration

app.use(require("express-session")({
    secret: "I love my family that absolutely includes cml",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add a forever executed currentUser middleware (undefined or an id)

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comment", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BEGIN");
});
