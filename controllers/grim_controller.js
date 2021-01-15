const express = require("express")
const grim = express.Router()

const Entry = require('../models/entry.js')

grim.get('/', (req, res) => {
  Entry.find({}, (error, foundEntries) => {
    res.json(foundEntries)
  })
})


module.exports = grim
