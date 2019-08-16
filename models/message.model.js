const mongoose = require('mongoose');
const { Schema } = mongoose

const MessageSchema = new Schema({
  src: String,
  name: String,
  message: String,
})

module.exports = mongoose.model('Message', MessageSchema)