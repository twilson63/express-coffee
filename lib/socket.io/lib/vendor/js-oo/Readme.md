
# JavaScript OO

Super lightweight Object Oriented library for JavaScript.

## Examples

Create a simple class, with no properties or methods:

    User = Class()
    // or Class.extend()
    
Create a class containing both properties and methods:

    User = Class({
      type: 'user',
      init: function(name) {
        this.name = name
      }
    })
    
Create an instance of the "User" class above:

    tj = new User('tj')
    tj.type
    // => "user"
    tj.name 
    // => "tj"
    
Subclass the User class we created:

    Admin = User.extend({
      type: 'admin'
    })

    tj = new Admin('tj')
    tj.type
    // => "admin"
    tj.name 
    // => "tj"
    
Reference superclass methods using __super__:

    Admin = User.extend({
      init: function(name, age) {
        this.__super__(name)
        this.age = age
      },
      
      toString: function() {
        return '<Admin name="' + this.name + '" age=' + this.age + '>'
      }
    })
    
    tj = new Admin('tj', 22)
    tj.toString()
    // => "<Admin name=\"tj\" age=22>"
      
Include more methods:

    Admin.include({
      says: function(){
        return 'Im an admin!'
      }
    })
    
Or include some mixins (objects):

    Enumerable = { ... }
    Comparable = { ... }

    Animal = Class({
      include: [Enumerable, Comparable]
    })
    
Or a single mixin:
  
    Animal = Class({
      include: Enumerable
    })
    
Extend singleton prototype with methods:

    User = Class({
      extend: {
        path: '/users'
      }
    })
    
    User.path
    // => '/users'
    
Or using "mixins":

    User = Class({
      extend: Foo
    })
    
Or using several "mixins":

    User = Class({
      extend: [Foo, Bar]
    })
    
## License 

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.