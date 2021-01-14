const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  type: String,
  date: String,
  image: { type: String, default: 'https://cdn.webshopapp.com/shops/12972/files/314421149/how-do-crystals-form.jpg'},
  description: String,
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry 
