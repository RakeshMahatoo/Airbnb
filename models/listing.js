const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define database add title, description, image, price, location, country

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        // required: true,
    },
    image: {
       
            type: String,
            // required: true,
       
    },
    // default: "https://images.unsplash.com/photo-1748737349508-fc1f3f3b762d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // set: (v) => v === " " ? "https://images.unsplash.com/photo-1748737349508-fc1f3f3b762d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,

   price: Number,
   location: String,
   country: String,
   review: [
    {
        // type: mongoose.Schema.Types.ObjectId
        type: Schema.Types.ObjectId,  // review of object id of hotel will be store in this.
        ref: "Review",
    }
   ]
});

// first create schema then create model, then it will show error


//========create model/table name using listingSchema===========

const Listing = mongoose.model("Listing", listingSchema);
// we export this model in express which is app.js

module.exports = Listing;