const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/expressErrors.js");
const {listingSchema, reviewSchema}=require("./schema.js");

module.exports.validateListing=(req, res, next)=>{
    let {error} =listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next(); 
    }
};

module.exports.validateReview=(req, res, next)=>{
    let {error} =reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next(); 
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path, "..", req.originalUrl);
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login to make changes!");
    return res.redirect("/login");
};

module.exports.saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async (req, res, next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)){
        req.flash("error", "You don't have permission to make changes to this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor= async (req, res, next)=>{
    let {id, reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)){
        req.flash("error", "You don't have permission to delete this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};