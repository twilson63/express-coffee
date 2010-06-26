
describe 'Class'
  it 'should be an instanceof Function'
    (new Class({})).should.be_an_instance_of Function
  end
  
  it 'should be an instanceof Class'
    (new Class({})).should.be_an_instance_of Class
  end
  
  describe 'properties'
    it 'should be assigned when #extend is present'
      var User = new Class({
        extend: {
          foo: 'bar'
        }
      })
      User.foo.should.eql 'bar'
    end
  end
  
  describe 'instances'
    it 'should be an instance of their respective class'
      var User = new Class({})
      var tj = new User
      tj.should.be_an_instance_of User
    end
    
    describe '#constructor()'
      it 'should reflect the class when a constructor is not provided'
        var User = new Class({})
        var tj = new User
        tj.constructor.should.equal User
      end
      
      it 'should reflect the class when a constructor is provided'
        var User = new Class({
          constructor: function(name) {
            this.name = name
          }
        })
        var tj = new User('tj')
        tj.constructor.should.equal User
      end
      
      it 'should be called upon creation of the instance'
        var User = new Class({
          constructor: function(name) {
            this.name = name
          }
        })
        var tj = new User('tj')
        tj.name.should.eql 'tj'
      end
    end
    
    describe '.include()'
      it 'should extend the prototype'
        var User = new Class({ foo: 'bar' })
        User.include({ foo: 'baz' })
        (new User('tj')).foo.should.eql 'baz'
      end
      
      describe 'when the object responds to #included()'
        it 'should call #included() with the superclass'
          var Model = new Class({})
          var Resource = new Class({
            extend: {
              included: function(superclass){}
            }
          })
          Resource.should.receive('included').with_args(Model)
          Model.include(Resource)
        end
      end
    end
    
    describe 'getters'
      it 'should work'
        var User = new Class({
          get name(){
            return this.__name__ || 'none'
          }
        })
        var tj = new User
        tj.name.should.eql 'none'
      end
    end
    
    describe 'setters'
      it 'should work'
        var User = new Class({
          get name(){
            return this.__name__ || 'none'
          },
          set name(val){
            this.__name__ = val.toUpperCase()
          }
        })
        var tj = new User
        tj.name = 'tj'
        tj.name.should.eql 'TJ'
      end
    end
    
    describe 'subclassing'
      describe 'when self reponds to .extended()'
        it 'should call .extended() with the subclass'
          var User = new Class({
            extend: {
              extended: function(){}
            }
          })
          var Admin
          User.should.receive('extended').with_args(Admin)
          Admin = User.extend({})
        end
      end
    
      describe 'several times'
        before_each
          User = new Class({
            foo: 'foo',
            constructor: function(name){
              this.name = name
            },
            toString: function(){
              return '[User ' + this.name + ']'
            }
          })
          
          Admin = User.extend({
            bar: 'bar',
            constructor: function(name){
              User.call(this, name.toUpperCase())
            },
            
            toString: function(){
              return '[Admin ' + this.name + ']'
            }
          })
          
          SuperUser = Admin.extend({
            baz: 'raz',
            toString: function(){
              return '[SuperUser ' + this.name + ']'
            }
          })
        end
        
        it 'should respond to instanceof properly'
          (new User('tj')).should.be_an_instance_of User
          (new User('tj')).should.not.be_an_instance_of Admin
          (new Admin('tj')).should.be_an_instance_of User
          (new Admin('tj')).should.be_an_instance_of Admin
          (new SuperUser('tj')).should.be_an_instance_of User
          (new SuperUser('tj')).should.be_an_instance_of Admin
          (new SuperUser('tj')).should.be_an_instance_of SuperUser
        end
        
        it 'should call constructors properly'
          (new User('tj')).toString().should.eql '[User tj]'
          (new Admin('tj')).toString().should.eql '[Admin TJ]'
          (new SuperUser('tj')).toString().should.eql '[SuperUser TJ]'
        end
        
        it 'should inherit properties properly'
          (new User('tj')).foo.should.eql 'foo'
          (new Admin('tj')).bar.should.eql 'bar'
          (new SuperUser('tj')).baz.should.eql 'raz'
        end
      end
    end
    
  end
end