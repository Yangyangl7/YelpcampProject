var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    desc:String,
    location:String,
    lat:Number,
    lng:Number,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }
    ],
    author: {
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);