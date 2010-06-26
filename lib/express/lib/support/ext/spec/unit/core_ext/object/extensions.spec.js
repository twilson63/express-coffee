
describe 'Object'
  describe '.merge()'
    it 'should merge the given objects'
      var a = {}
      var b = { foo: 'bar' }
      Object.merge(a, b).should.equal a
      a.foo.should.eql 'bar'
    end

    it 'should give the object being merged precendence'
      var a = { foo: 'foo' }
      var b = { foo: 'bar' }
      Object.merge(a, b).should.equal a
      a.foo.should.eql 'bar'
    end
    
    it 'should work when the second argument is undefined'
      Object.merge({ foo: 'bar' }).should.eql { foo: 'bar' }
    end
  end
  
  describe '.values()'
    it 'should return the values of an object as an array'
      Object.values({ foo: 'bar', baz: 'raz' }).should.eql ['bar', 'raz']
    end
    
    it 'should return an empty array when non-object is passed'
      Object.values(0).should.eql []
      Object.values([]).should.eql  []
      Object.values(null).should.eql  []
      Object.values().should.eql []
    end
  end
  
  describe '.mergeDeep()'
    it 'should perform a deep merge'
      var a = { user: { name: { first: 'tj' }}}
      var b = { user: { name: { last: 'holowaychuk' }}}
      Object.mergeDeep(a, b).should.equal a
      a.should.eql { user: { name: { first: 'tj', last: 'holowaychuk' }}}
    end
    
    it 'should give the object being merged precendence'
      var a = { user: { name: { first: 'tj' }}}
      var b = { user: { name: { first: 'simon' }}}
      Object.mergeDeep(a, b).should.equal a
      a.should.eql { user: { name: { first: 'simon' }}}
    end
    
    it 'should work when keys are not available on the source object'
      var a = {}
      var b = { user: { name: { first: 'simon' }}}
      Object.mergeDeep(a, b).should.equal a
      a.should.eql { user: { name: { first: 'simon' }}}
    end
    
    it 'should work when an undefined object is passed'
      Object.mergeDeep({ foo: 'bar' }).should.eql { foo: 'bar' }
    end
  end
end

