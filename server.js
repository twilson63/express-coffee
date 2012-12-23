var app = require('./.app');
// Start Server
var port = app.port;
app.listen(port, function(){
  console.log("Listening on "+port+"\nPress CTRL-C to stop server.");
})