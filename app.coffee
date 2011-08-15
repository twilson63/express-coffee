express = require('express')
app = express.createServer()

# Setup Template Engine
app.register '.coffee', require('coffeekup')
app.set 'view engine', 'coffee'

# Setup Static Files
app.use express.static(__dirname + '/public')

# App Routes
app.get '/', (request, response) ->
  response.render 'index'

# Listen
app.listen process.env.C9_PORT