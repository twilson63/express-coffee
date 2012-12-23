# Just sends hello world in JSON
exports.index = (req, res) ->
  data = {"hello":["world"]}
  res.send data
  
# Sends anything from request back as JSON
exports.pong = (req, res) ->
  data = 
    query: req.query
    body: req.body
    params: req.params
    route: req.route
    cookies: req.cookies
    id: req.params.id
    controller: req.params.controller
    method: req.params.method
  res.send data