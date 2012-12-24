mongoose = require 'mongoose'

# Post model
Post = new mongoose.Schema(
  title: String
  body: String
  url: String
)

module.exports = mongoose.model 'Post', Post