
require.paths.unshift('lib')

var sys = require('sys'),
    Class = require('class').Class,
    times = 500000

function bm(label, fn) {
  var start = +new Date
  fn()
  sys.puts('  ' + label + ' : ' + (+new Date - start) + ' ms')
}

sys.puts('\n  running ' + times + ' times\n')

bm('prototype', function(){
  var n = times
  while (n--) {
    function User(name) {
      this.name = name.trim()
    }
    function Admin(name) {
      User.call(this, name)
    }
    new Admin('tj')
  }
})

bm('sys.inherits()', function(){
  var n = times
  while (n--) {
    function User(name) {
      this.name = name.trim()
    }
    function Admin(name) {
      User.call(this, name)
    }
    sys.inherits(Admin, User)
    new Admin('tj')
  }
})

bm('class.js', function(){
  var n = times
  while (n--) {
    var User = new Class({
      constructor: function(name){
        this.name = name.trim()
      }
    })
    var Admin = User.extend({
      constructor: function(name){
        User.call(this, name)
      }
    })
    new Admin('tj')
  }
})

// --- Instance Creation

sys.puts('\n  instance creation \n')

bm('prototype instance', function(){
  var n = times
  function User(name) {
    this.name = name.trim()
  }
  function Admin(name) {
    User.call(this, name)
  }
  while (n--) new Admin('tj')
})

bm('sys.inherits() instance', function(){
  var n = times
  function User(name) {
    this.name = name.trim()
  }
  function Admin(name) {
    User.call(this, name)
  }
  sys.inherits(Admin, User)
  
  while (n--) new Admin('tj')
})

bm('class.js instance', function(){
  var n = times
  var User = new Class({
    constructor: function(name){
      this.name = name.trim()
    }
  })
  var Admin = User.extend({
    constructor: function(name){
      User.call(this, name)
    }
  })
  while (n--) new Admin('tj')
})

sys.puts('')