
var n = 400000,
    array = []
    
exports.n = n

while (n--)
  array.push(n)

array = array.reverse()
  
// --- Array

exports['Array for loop'] = function(){
  for (var i = 0; i < array.length; ++i)
    ;
}

exports['Array for loop cached'] = function(){
  for (var i = 0, len = array.length; i < len; ++i)
    ;
}
  
exports['Array#each()'] = function(){
  array.each(function(){})
}

exports['Array#select()'] = function(){
  array.select(function(n){ return n < 100 })
}

exports['Array#reject()'] = function(){
  array.reject(function(n){ return n < 100 })
}

exports['Array#find()'] = function(){
  var ret = array.find(function(n){ return n > 10000 })
}

exports['Array#all()'] = function(){
  array.all(function(n){ return n < 10000 })
}

exports['Array#none()'] = function(){
  array.none(function(n){ return n > 10000 })
}

