const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure data.js is in the same directory
const Listing = require("../models/listings.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    // Assign the owner to each listing
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "688b49094c328c9eb123ec91",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

initDB();
