// import express
const express = require('express')
const app = express();
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
const path = require("path");

// load the route
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

// load the modal
const Blog = require("./models/blog");

// env file load
require('dotenv').config();

// import db config file
const db = require('./db');
// mongoose
//   .connect(process.env.DB_URL)
//   .then((e) => console.log("MongoDB Connected"));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// define middleware
const { checkForAuthenticationCookie } = require('./middelwares/authentication');


// Define a Port
const PORT = process.env.PORT || 3000; 

// set ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

// route
app.get('/', async (req, res) => {
    // res.render('home');
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, ()=>{console.log(`Listening on port : ${PORT}`)})