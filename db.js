// import mongoose and .env
require('dotenv').config();
const mongoose = require('mongoose');

// connect with mongodb
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL);

// Get the Default Connections
// mongoose maintains a default connections object representing the MongoDB connection 
const db = mongoose.connection;

// define a event listeners for database connection
db.on('connected', () => {
    console.log('Connected to Mongo DB Server');
})

// define a event listeners for database error
db.on('error', (err) => {
    console.log('Connected to Mongo DB Server error:', err);
})

// define a event listeners for database disconnect
db.on('disconnected', () => {
    console.log('Connected to Mongo DB Server Disconnect');
})

// export a DB Connection
module.exports = db;