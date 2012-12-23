Post = require '../models/Post'

module.exports = 
  index: (req, res, render) ->
    Post.find {}, (err, posts) ->
      render posts
      
  