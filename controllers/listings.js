const Listing = require("../models/listings.js");

module.exports.index = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.render("listings/index", { allListings: listings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    console.log(listing);

    res.render("listings/show", { listing, currUser: req.user });
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

module.exports.createListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // logged-in user
    newListing.image = { url, filename }; // save image

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not create listing");
    res.redirect("/listings");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace(
      "/upload/",
      "/upload/w_300,h_300,c_fill/"
    );
    res.render("listings/edit", { listing, originalImageUrl });
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // Check if listing exists
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Permission check: Only owner can edit
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }

  // Prevent empty update
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }

  // Update basic fields
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.country = req.body.listing.country;
  listing.location = req.body.listing.location;

  // If a new file was uploaded, update image
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
