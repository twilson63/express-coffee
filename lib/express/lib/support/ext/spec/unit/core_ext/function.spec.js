
describe 'Function'
  describe '#bind()'
    it 'should return a function executing in context to the given object'
      function increment(){ return this + 1 }
      var n = 5
      increment.bind(n)().should.eql 6
    end
    
    it 'should accept arguments to "curry"'
      function increment(n){ return this + (n || 1) }
      var n = 5
      increment.bind(n, 2)().should.eql 7
    end
  end
  
  describe '#curry()'
    it 'should accept arguments to "curry"'
      function joinString(delim) {
        return Object.values(arguments).drop(1).join(delim || ' ')
      }
      joinString(',', 'foo', 'bar').should.eql 'foo,bar'
      var joinComma = joinString.curry(',')
      joinComma('foo', 'bar').should.eql 'foo,bar'
    end
  end
end