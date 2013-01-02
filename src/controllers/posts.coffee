Post = require '../models/post'

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
        
  # Gets post by id
  get: (req, res) ->
    Post.findById req.params.id, (err, post) ->
      if not err
        res.send post
      else
        res.send err
        res.statusCode = 500
             
  # Updates post with data from `req.body`
  update: (req, res) ->
    Post.findByIdAndUpdate req.params.id, {"$set":req.body}, (err, post) ->
      if not err
        res.send post
      else
        res.send err
        res.statusCode = 500
    
  # Deletes post by id
  delete: (req, res) ->
    Post.findByIdAndRemove req.params.id, (err) ->
      if not err
        res.send {}
      else
        res.send err
        res.statusCode = 500
      
  