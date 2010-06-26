require('../lib/coffee/lib/coffee');
!function() {
  var helpers = exports.helpers = require('../lib/coffee/lib/coffee-script/lib/helpers').helpers;
  helpers.extend(exports, require('../lib/coffee/lib/coffee-test'));

  require('../public/javascripts/underscore');
  require('../public/javascripts/Math.uuid');

  // mock out audio for headless testing
  this.Audio = function() {};
  this.Audio.prototype.play = function() {};

  exports.Lz = require('../views/application');
  exports.sys = require('sys');

  // mock out console
  this.console = {
    log: exports.sys.puts,
    dir: function(o) { console.log(exports.sys.inspect(o)); }
  }

}();
