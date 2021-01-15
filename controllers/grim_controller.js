const express = require("express")
const grim = express.Router()

const Entry = require('../models/entry.js')

grim.get('/', (req, res) => {
  Entry.find({}, (error, foundEntries) => {
    res.json(foundEntries)
  })
})

grim.post('/', (req, res) => {
  Entry.create(req.body, (error, createdEntry) => {
    Entry.find({}, (error, foundEntries) => {
      res.json(foundEntries)
    })
  })
})

grim.put('/:id', (req, res) => {
  Entry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedEntry) => {
      if(error){
        res.send(error)
      } else {
        Entry.find({}, (error, foundEntries) => {
          res.json(foundEntries)
        })
      }
    }
  )
})

grim.delete('/:id', (req, res) => {
  Entry.findByIdAndRemove(req.params.id, (error, deletedEntry) => {
    Entry.find({}, (error, foundEntries) => {
      res.json(foundEntries)
    })
  })
})

module.exports = grim
