posts = require './controllers/posts'
mainPage = require './controllers/mainPage'

module.exports = (app) ->
  app.get '/', mainPage.mainPage

  # Get root_path return index view
  app.get "/posts/", posts.index
  app.get "/posts/new", posts.new
  app.post "/posts/create", posts.create 