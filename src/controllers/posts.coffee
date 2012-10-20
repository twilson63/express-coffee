Post = require '../models/Post'

module.exports = 
  index: (req, res) ->
    Post.find {}, (err, posts) ->
      res.render "posts/index",
        title: "home"
        posts: posts

  new: (req, res) ->
    res.render 'posts/new', title:"Write New Post"

  create: (req, res) ->
    console.log req.body
    console.log '--------------------'
    # new Post(req.body.post).save ->
    #   res.redirect "/"

  show: (req, res) ->
    Post.findById req.params.id, (err, post) ->
      res.render 'post', post: post, title: post.title