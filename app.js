const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const data = require("./init/data.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const {lisringSchema} = require("./schema.js");





//==============view engin=============

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);


//============req.paramst============
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


//=================static files===========
app.use(express.static(path.join(__dirname, "public")));


//===================ROOT================
app.get("/", (req, res) => {
   res.send("Hi, I am root");
});


//=======CONNECT WITH MONGO DBS==============


main().then((res) => {
   console.log("Database connection successfuly")
})
   .catch((err) => {
      console.log(err);
   });

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// -----------------------------------------------------



// Index Route

app.get("/listings", wrapAsync(async (req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", { allListings });

}));
//New Route

app.get("/listings/new", (req, res) => {
   res.render("listings/new.ejs");
});


// Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs", { listing });

}));

//--Create Route
app.post("/listings", wrapAsync(async (req, res, next) => {
   // let result = listingSchema.validate(req.body);
   // console.log(result);
   // if(resourceLimits.error){
   //    throw new ExpressError(400, resourceLimits.error);
   // }
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");


}));




//--Edit Route

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit.ejs", { listing });
}));

//=========update route=====

app.put("/listings/:id", wrapAsync(async (req, res) => {
   let { id } = req.params;
   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   res.redirect(`/listings/${id}`);
}));
//Delete Route

app.delete("/listings/:id", wrapAsync(async (req, res) => {
   let { id } = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect("/listings");
}));

//-review route

app.post("/listings/:id/reviews", async(req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review)  // yaha pe store ho jayeg client to server newReview k pass
 await listing.review.push(newReview); 
  await newReview.save();
 await listing.save()
res.redirect(`/listings/${listing._id}`)
});

//===============ADD EXPRESS ERROR=======================

// app.all("*", (req, res, next) => {
//    next(new ExpressError(404, "Page Not Found"));
// });


app.use((err, req, res, next) => {
   const { statusCode = 500, message = "Something went wrong!" } = err;
   res.status(statusCode).render("error", { message, statusCode });
});




// Listing validation failed: price: Path `price` is required., location: Path `location` is required., country: Path `country` is required.

//=============================PORT==================
app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
