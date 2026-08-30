const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// module.exports.index= async(req, res)=>{
//    const all_listings=await Listing.find({}); 
//    res.render("listings/index.ejs", {all_listings});
// };
module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    let all_listings;

    if (search && search.trim() !== "") {
        const searchRegex = new RegExp(search.trim(), "i");

        all_listings = await Listing.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { country: searchRegex },
            ],
        });
    } else if (category && category !== "Trending") {
        all_listings = await Listing.find({
            category: category,
        });
    } else {
        all_listings = await Listing.find({});
    }

    res.render("listings/index.ejs", {
        all_listings,
        activeCategory: category || "Trending",
        searchQuery: search || "",
    });
};

module.exports.renderNewForm= (req, res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing= async(req, res)=>{
   let {id}=req.params;
   const listing=await Listing.findById(id)
   .populate({path: "reviews", populate: {
      path: "author",
   }})
   .populate("owner");
   if(!listing){
      req.flash("error", "Requested listing does not exist!");
      return res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs", {
      listing,
      mapToken: process.env.MAP_TOKEN,
   });
}                          

module.exports.createListing= async(req, res, next)=>{
   let response= await geocodingClient.forwardGeocode({
   query: req.body.listing.location,
   limit: 1,
   }).send();

   console.log("Features:", response.body.features);
   console.log("Geometry:", response.body.features[0]?.geometry);

   let url= req.file.path;
   let filename= req.file.filename;
   // console.log(url, " - ", filename);
   const newListing=new Listing(req.body.listing);
   newListing.owner = req.user._id;
   newListing.image= {url, filename};
   
   newListing.geometry= response.body.features[0].geometry;

   let savedListing= await newListing.save(); 
   console.log(savedListing);
   req.flash("success", "New listing created.");
   res.redirect("/listings");
}

module.exports.renderEditForm= async(req, res)=>{
   let {id}=req.params;
   const listing=await Listing.findById(id);
   if(!listing){
      req.flash("error", "Requested listing does not exist!");
      return res.redirect("/listings");
   }
   let originalImageUrl= listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload", "/upload/w_260,h_170,c_fill");
   res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing= async(req, res)=>{
   let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing}); 
   if(typeof req.file != 'undefined'){
      let url= req.file.path;
      let filename= req.file.filename;
      listing.image= {url, filename};
      await listing.save();
   }
   req.flash("success", "Listing Updated!");
   res.redirect(`/listings/${id}`);
}

module.exports.destroyListing= async(req, res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    console.log(deletedListing);
    res.redirect("/listings");
}