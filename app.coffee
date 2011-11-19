express = require 'express'
assets = require 'connect-assets'

app = express.createServer()
app.use assets()
app.set 'view engine', 'jade'

app.get '/', (req, resp) -> resp.render 'index'

app.listen 3000