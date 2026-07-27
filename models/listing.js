const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const Review= require("./review.js");

const defaultLink="https://www.thesun.co.uk/wp-content/uploads/2020/05/NINTCHDBPICT000580920683-e1588600254612.jpg";
const listingSchema=new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        url: String,
        filename: String,
    },

    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    category: {
    type: [String],
    enum: ["Trending", "Iconic Cities", "Luxe", "Mountains",
           "Castles", "Pools", "Camping", "Boats",
           "Beaches", "Pet Friendly"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing; 