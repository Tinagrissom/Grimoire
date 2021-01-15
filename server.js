// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");

// CONFIGURATION
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(PORT, () => {
  console.log('listening', PORT);
})
