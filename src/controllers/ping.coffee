
# Sends `{"hello":["world"]}` in JSON
exports.index = (req, res) ->
  data = {"hello":["world"]}
  res.send data
  
# Sends anything from request back as JSON
exports.pong = (req, res) ->
  # Create ping-pong response from received data
  data = 
    pongQuery: req.query
    pongBody: req.body
    pongParams: req.params
    pongCookies: req.cookies
    id: req.params.id
    controller: req.params.controller
    method: req.params.method
  # Send response object as JSON
  res.send data