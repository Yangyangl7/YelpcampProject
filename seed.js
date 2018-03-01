var Campground = require("./models/Campgrounds");
var Comment = require("./models/Comment");

var data = [
    {
        name:"Blue camp",
        image:"https://farm3.staticflickr.com/2929/14442301811_04f2a7f7a2.jpg",
        desc:"My new cool camp. Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.",
    },
    {
        name:"Our restaurant",
        image:"https://farm9.staticflickr.com/8309/7968772438_3e0935fab7.jpg",
        desc:"Look at our simple eatting set. Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.",
    },
    {
        name:"Dissert camp",
        image:"https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
        desc:"Awesome camp site. Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.",
    } 
];

function seedDB(){
    Campground.remove({}, function(err){
         if(err) {
           console.log(err);
         }
    
        // console.log("Remove campgrounds successfully");
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, seedCamp){
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("add a campground");
        //             Comment.create(
        //                 {
        //                     author:"Lily",
        //                     content:"Oh my goddness, I want to go there",
        //                 }
        //             , function(err, comment){
        //                 if(err) {
        //                     console.log(err);
        //                 } else {
        //                     seedCamp.posts.push(comment._id);
        //                     seedCamp.save();
        //                     console.log("add a comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    });    
}

module.exports = seedDB;
