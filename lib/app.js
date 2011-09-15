(function() {
  var app, express;
  express = require('express');
  app = express.createServer();
  app.register('.coffee', require('coffeekup'));
  app.set('view engine', 'coffee');
  app.use(express.static(__dirname + '/public'));
  app.get('/', function(request, response) {
    return response.render('index');
  });
  app.listen(process.env.PORT || 8000);
}).call(this);
