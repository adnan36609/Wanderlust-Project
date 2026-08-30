const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});

const User = require("../models/user.js");

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
    accessToken: mapToken,
});

const mongo_url = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const user = await User.findOne();

    if (!user) {
        console.log("No user found in database.");
        return;
    }

    console.log(`Using ${user.username} as listing owner`);

    const listings = [];

    for (let obj of initData.data) {
        console.log(`Geocoding: ${obj.location}, ${obj.country}`);

        let response = await geocodingClient
            .forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1,
            })
            .send();

        obj.owner = user._id;
        obj.geometry = response.body.features[0].geometry;

        listings.push(obj);

        console.log(`Added: ${obj.title}`);
    }

    console.log(`\nTotal listings ready to insert: ${listings.length}`);

    await Listing.insertMany(listings);

    console.log("Data was initialized!");
};

main()
    .then(async () => {
        console.log("Connected to Atlas DB");
        await initDB();
        await mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });