mongoose = require 'mongoose'

# User model
User = new mongoose.Schema(
  someField: String
)

module.exports = mongoose.model 'User', User