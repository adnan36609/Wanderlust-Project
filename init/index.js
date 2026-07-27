const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const listings = [];

    for (let obj of initData.data) {
        let response = await geocodingClient
            .forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1,
            })
            .send();

        obj.owner = "6a57d20ae32b895bce0db8fe";
        obj.geometry = response.body.features[0].geometry;

        listings.push(obj);
    }

    await Listing.insertMany(listings);

    console.log("Data was initialized!");
};

main()
    .then(async () => {
        console.log("Connected to DB");
        await initDB();
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });