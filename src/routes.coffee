#### Routes
# We are setting up theese routes:
#
# GET, POST, PUT, DELETE methods are going to the same controller methods - we dont care.
# We are using method names to determine controller actions for clearness.

module.exports = (app) ->
  #   - _/_ -> controllers/index/index method
  app.all '/', (req, res, next) ->
    routeMvc('index', 'index', req, res, next)

  #   - _/**:controller**_  -> controllers/***:controller***/index method
  app.all '/:controller', (req, res, next) ->
    routeMvc(req.params.controller, 'index', req, res, next)

  #   - _/**:controller**/**:method**_ -> controllers/***:controller***/***:method*** method
  app.all '/:controller/:method', (req, res, next) ->
    routeMvc(req.params.controller, req.params.method, req, res, next)

  #   - _/**:controller**/**:method**/**:id**_ -> controllers/***:controller***/***:method*** method with ***:id*** param passed
  app.all '/:controller/:method/:id', (req, res, next) ->
    routeMvc(req.params.controller, req.params.method, req, res, next)

  # If all else failed, show 404 page
  app.all '/*', (req, res) ->
    console.warn "error 404: ", req.url
    res.statusCode = 404
    res.render '404', 404

# render the page based on controller name, method and id
routeMvc = (controllerName, methodName, req, res, next) ->
  controllerName = 'index' if not controllerName?
  controller = null
  try
    controller = require "./controllers/" + controllerName
  catch e
    console.warn "controller not found: " + controllerName, e
    next()
    return
  data = null
  if typeof controller[methodName] is 'function'
    actionMethod = controller[methodName].bind controller
    actionMethod req, res, next
  else
    console.warn 'method not found: ' + methodName
    next()
