// bootstrap server config
require.paths.unshift('./lib/express/lib', './lib/coffee/lib')
require('express');
require('coffee'); // coffeescript!

configure(function() {
  set('root', __dirname); // required  for views
  enable('show exceptions');

  require('express/plugins');
  use(Static); // required for public/[images, javascripts]
  use(Logger);
  use(MethodOverride); // required for put / del routes
  use(Cookie);
});

require('./app')