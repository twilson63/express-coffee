
var n = 40000
exports.n = n

exports['null'] = function(){
  for (var i = 0; i < n; ++i)
    ;
}

var a = { foo: 'bar' },
    b = {},
    i = 400

while (i--)
  b[i] = i

exports['Object.merge()'] = function(){
  for (var i = 0; i < n; ++i) {
    Object.merge(a, b)
  }
}

var a = { foo: 'bar' },
    b = {},
    i = 400

while (i--)
  b[i] = i

exports['Object.mergeDeep()'] = function(){
  for (var i = 0; i < n; ++i) {
    Object.mergeDeep(a, b)
  }
}
