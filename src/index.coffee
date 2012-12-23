
express = require 'express'
stylus = require 'stylus'
assets = require 'connect-assets'
mongoose = require 'mongoose'

# Create app instance
app = express()

# set instance running environments. they have to match those in config.coffee
config = require "./config"
app.configure 'production', 'development', 'testing', ->
	config.setEnvironment app.settings.env

mongoose.connect 'mongodb://localhost/example'
# Add Connect Assets
app.use assets()
# Set the public folder as static assets
app.use express.static(process.cwd() + '/public')

app.use express.bodyParser() 
# Set View Engine
app.set 'view engine', 'jade'

# Initialize routes
routes = require './routes'
routes(app)



# Define Port
app.port = process.env.PORT or process.env.VMC_APP_PORT or 3000
module.exports = app

