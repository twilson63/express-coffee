var CoffeeScript = require('./coffee-script/lib/coffee-script');

exports.render = function(content, options) {
  return CoffeeScript.compile(content);
};
require.registerExtension('.js.coffee', exports.render);

try {
  var haml = require('haml');
  haml.filters.coffeescript = function(str) {
    return ['<script>', exports.render(str), '</script>'].join("\n");
  };
} catch (e) {}