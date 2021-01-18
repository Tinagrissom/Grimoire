// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");

// CONFIGURATION
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const entryController = require('./controllers/grim_controller.js')
app.use('/entries', entryController)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {
  console.log('listening', PORT);
})
