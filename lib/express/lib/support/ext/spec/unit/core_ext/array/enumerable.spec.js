describe 'Array'
  describe '#each()'
    it 'should be an alias of #forEach()'
      Array.prototype.each.should.equal Array.prototype.forEach
    end

    it 'should pass val as the first argument'
      var vals = [];
      1..4.each(function(val){ vals.push(val) })
      vals.should.eql 1..4
    end

    it 'should pass index as the second argument'
      var vals = [];
      1..4.each(function(val, i){ vals.push(i) })
      vals.should.eql 0..3
    end

    it 'should pass _this_ as the third argument'
      var result;
      1..4.each(function(val, i, thisp){ result = thisp })
      result.should.eql 1..4
    end
  end
end

