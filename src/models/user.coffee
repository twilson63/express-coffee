mongoose = require 'mongoose'

# User model
User = new mongoose.Schema(
  s: String
  body: String
  url: String
)

module.exports = mongoose.model 'User', User