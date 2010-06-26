
var n = 4000,
    sprintf = require('ext').sprintf
exports.n = n

exports['null'] = function(){
  for (var i = 0; i < n; ++i)
    ;
}

exports['printf()'] = function(){
  for (var i = 0; i < n; ++i)
    sprintf('%25s : %d', 'foo', 4)
}