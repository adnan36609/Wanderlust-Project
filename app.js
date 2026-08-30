const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=process.env.PORT || 8080;
const path=require("path");
const methodOverride=require("method-override"); 
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/expressErrors.js");
const Review=require("./models/review.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const MongoStore= require("connect-mongo"); 
const flash= require("connect-flash");
const passport= require("passport");
const localStrategy= require("passport-local");
const User= require("./models/user.js");

//connecting to database: 
const db_url= process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(db_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


main()
    .then(() => {
        console.log("Connected to DB");
        app.listen(port, () => {
            console.log(`server is listening to port ${port}`);
        });
    })
    .catch(error => console.log(error));

const secret= process.env.SECRET;

const store= MongoStore.create({
    mongoUrl: db_url,
    secret,
    touchAfter: 24*60*60,
});

store.on("error", (err)=>{
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions={
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(async (username, done) => {
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return done(null, false); 
        }
        done(null, user);
    } catch (err) {
        done(null, false); 
    }
});


//middle-ware:
app.use((req, res, next)=>{
    console.log("REQUEST HIT:", req.method, req.originalUrl);
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser= req.user;
    res.locals.searchQuery = req.query.search || "";
    next();
});

//express-router
app.use("/listings", listingRouter); 
app.use("/listings/:id/reviews", reviewRouter); 
app.use("/", userRouter); 
app.get("/", (req, res) => {
    res.redirect("/listings");
});

//error handling using middle-ware:
app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page NOT Found"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.locals.currentUser = res.locals.currentUser ?? req.user ?? null;
    res.locals.success = res.locals.success ?? [];
    res.locals.error = res.locals.error ?? [];
    res.status(statusCode).render("error.ejs", {err});
});
