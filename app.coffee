express = require 'express'
stylus = require 'stylus'
assets = require 'connect-assets'

app = express()
app.use assets()
app.set 'view engine', 'jade'

app.get '/', (req, resp) -> resp.render 'index'

port = process.env.PORT or process.env.VMC_APP_PORT or 3000
app.listen port, -> console.log "Listening on #{port}\nPress CTRL-C to stop server."