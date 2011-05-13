
require("express")

app = express.createServer()

app
  .get '/', (req, resp) ->
    resp.send 'hello'
  #
  # .register('.haml', require('hamljs'))
  # .get '/', (req, resp) ->
  #   @render 'index.html.haml'
  #
  #
  # .get '/*.js', (file) ->
  #   try
  #     @render "${file}.js.coffee", { layout: false }
  #   catch e
  #     @pass "/${file}.js"
  #
  # .get '/*.css', (file) ->
  #   try
  #     @render "${file}.css.sass", { layout: false }
  #   catch e
  #     @pass "/${file}.css"
  #
  # .get '/*', (file) ->
  #   try
  #     @render "${file}.html.haml"
  #   catch e
  #     throw e if e.errno != 2
  #     @pass "/${file}"
  #
  # .get '/*', (file) ->
  #   @pass "/public/${file}"
  #
server = app.listen(parseInt(process.env.PORT || 8000), null)

