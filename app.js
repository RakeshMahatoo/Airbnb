const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const data = require("./init/data.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

//==============view engin=============

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs", ejsMate);
//============req.paramst============
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//=================static files===========
app.use(express.static(path.join(__dirname, "public")));
//===================ROOT================
app.get("/",(req, res)=>{
    res.send("Hi, I am root");
});
//====================================



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
//=============new and create route=============

 app.get("/listings/new", async(req,res)=>{
    res.render("listings/new.ejs");
 });


 //=========================create show route==========
 app.get("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  const listing = await  Listing.findById(id);
  res.render("listings/show.ejs",{listing});

 });

 //=============new and create route=============

 app.get("/listings/new", async(req,res)=>{
    res.render("listings/new.ejs");
 });

 //==============click add button ==============

 app.post("/listings", async(req,res)=>{
    // let {title, description, image, price, country, location} = req.params;
    const newListing = new Listing(req.body.listing);         // database sysntax:  /*const user1 = new User({name: "aadam", email:
    //                                                                                                        "gmail.com", age: 48}); */
    // console.log(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 });


 //==============route for edite======

 app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
 })

 //=========update route=====

 app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
 });
     

 //=============delete this route===========

 app.delete("/listings/:id", async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect("/listings");
 });


 