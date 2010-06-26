
describe 'String'
  describe '#includes()'
    it 'should indicate whether a string contains another string'
      "this.is.a.test".includes('is.').should.be_true
      "another_one".includes('.').should.be_false
    end
  end

  describe '#count()'
    it 'should count occurences of a string in another'
      "this,is,a,test".count(',').should.eql 3
      "this,is,another,test".count('another').should.eql 1
      "this is a question???".count('?').should.eql 3
      "...".count(',').should.eql 0
    end
  end

  describe '#wrap'
    describe 'with a single string'
      it 'should wrap using string as prefix and suffix'
        'foo'.wrap('|').should.eql '|foo|'
      end
    end

    describe 'with several strings'
      it 'should wrap first as prefix, last as suffix'
        'foo'.wrap('(', ')').should.eql '(foo)'
      end
    end
  end

  describe '#startsWith()'
    it 'should check if a string starts with another'
      'foobar'.startsWith('foo').should.be_true
      'barfoo'.startsWith('foo').should.be_false
      ' foobar'.startsWith('foo').should.be_false
    end
  end

  describe '#endsWith()'
    it 'should check if a string ends with another'
      'foobar'.endsWith('bar').should.be_true
      'barfoo'.endsWith('bar').should.be_false
      'foobar '.endsWith('bar').should.be_false
    end
  end

  describe '#after()'
    it 'should return contents after the first ocurrence of the given string'
      'some foo bar'.after('foo').should.eql ' bar'
      'some foo bar'.after('rawr').should.eql ''
    end
  end

  describe '#before()'
    it 'should return contents before the first ocurrence of the given string'
      'some foo bar'.before('foo').should.eql 'some '
      'some foo bar'.before('rawr').should.eql ''
    end
  end

  describe '#remove()'
    it 'should replace substrings matching the given regexp'
      'foobar barfoo'.remove(/foo(bar)?/g).should.eql ' bar'
    end
  end

  describe '#padLeft()'
    it 'should pad the given width to the left'
      'foo'.padLeft(5).should.eql '  foo'
    end

    it 'should pad n spaces on the left with an optional character'
      'foo'.padLeft(5, '-').should.eql '--foo'
    end

    it 'should not pad when width is less than length'
      'foo'.padLeft(3).should.eql 'foo'
      'foo'.padLeft(2).should.eql 'foo'
    end
  end

  describe '#padRight()'
    it 'should pad the given width to the right'
      'foo'.padRight(5).should.eql 'foo  '
    end

    it 'should pad n spaces on the right with an optional character'
      'foo'.padRight(5, '-').should.eql 'foo--'
    end

    it 'should not pad when width is less than length'
      'foo'.padRight(3).should.eql 'foo'
      'foo'.padRight(2).should.eql 'foo'
    end
  end

  describe '#strip'
    it 'should remove leading and trailing whitespace'
      ' \n\n foo bar '.strip.should.eql 'foo bar'
    end
  end

  describe '#drop()'
    it 'should remove n characters'
      'foobar'.drop(3).should.eql 'bar'
    end
  end

  describe '#take()'
    it 'should return n characters'
      'foobar'.take(3).should.eql 'foo'
    end
  end
end

