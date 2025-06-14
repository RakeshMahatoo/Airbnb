const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



main().then((res)=>{
    console.log("Database connection successfuly")
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}



const initDB = async()=>{
    await Listing.deleteMany({});  // table listing will be empty
    await Listing.insertMany(initData.data); // insert data from initData.js file
    console.log("data was initialized");
};


// initDB();
