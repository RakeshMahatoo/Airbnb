const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const data = require("./init/data.js")
const path = require("path");


app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

//==============view engin=============

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//===================ROOT================
app.get("/",(req, res)=>{
    res.send("Hi, I am root");
});


//=======CONNECT WITH MONGO DBS==============


main().then((res)=>{
    console.log("Database connection successfuly")
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//==========================================================

// app.get("/testListing",async(req,res)=>{
// let sampleListing = new Listing({
//     title: "my new villa",
//     description: "by the beach",
//     price: 1200,
//     location: "calangute, goa",
//     country: "India",
// });
//  await sampleListing.save();
//  console.log("samplewas saved");
//  res.send("successful testing")
// });

//======================================================


//========================create route for listing========================

app.get("/listings", async(req, res)=>{
 const allListings =   await Listing.find({});
//  res.render("/listings/index.ejs", { allListings });
res.render("listings/index", { allListings });

});