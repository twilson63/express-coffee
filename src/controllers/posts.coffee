Post = require '../models/Post'
# Post model's CRUD controller.
module.exports = 
  # Lists all posts
  index: (req, res) ->
    Post.find {}, (err, posts) ->
      res.send posts
      
  # Creates new post with data from `req.body`
  create: (req, res) ->
    post = new Post req.body
    post.save (err, post) ->
      if not err
        res.send post
        res.statusCode = 201
      else
        res.send err
        res.statusCode = 500
      
  