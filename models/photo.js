var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PhotoSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String },
  fileType: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
})

var Photo = mongoose.model('Photo', PhotoSchema)
module.exports = Photo

