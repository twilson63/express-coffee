posts = require './controllers/posts'

express = require 'express'
stylus = require 'stylus'
assets = require 'connect-assets'
mongoose = require 'mongoose'

mongoose.connect 'mongodb://localhost/example'
app = express()
# Add Connect Assets
app.use assets()
# Set the public folder as static assets
app.use express.static(process.cwd() + '/public')
# Set View Engine
app.set 'view engine', 'jade'
# Get root_path return index view
app.get "/", posts.index
app.get "/posts/new", posts.new
app.post "/posts/create", posts.create

# Define Port
port = process.env.PORT or process.env.VMC_APP_PORT or 3000
# Start Server
app.listen port, -> console.log "Listening on #{port}\nPress CTRL-C to stop server."