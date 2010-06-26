
var n = 4000,
    date = require('ext/core_ext/date')
    
exports.n = n

exports['null'] = function(){
  for (var i = 0; i < n; ++i)
    ;
}

exports['parse("next <day>")'] = function(){
  for (var i = 0; i < n; ++i)
    date.parse('next tuesday')
}

exports['parse("in <number> <quantifier>")'] = function(){
  for (var i = 0; i < n; ++i)
    date.parse('in five weeks')
}