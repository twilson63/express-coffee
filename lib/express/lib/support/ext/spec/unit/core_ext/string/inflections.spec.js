describe 'String inflections'
  describe '#singular & #plural'
    before
      testStrings = [
        'person','man','woman','child','sex','move','Person','Man','Woman','Child',
        'Sex','Move','equipment','information','rice','money','species','series',
        'fish','sheep','deer','Equipment','Information','Rice','Money','Species',
        'Series','Fish','Sheep','Deer','octopus','wolf','potato','fool','blue',
        'bus','student','tuna','Octopus','Wolf','Potato','Fool','Blue','Bus',
        'Student','Tuna','news','News','mouse','Mouse','information','Information',
        'ox','Ox','virus','Virus','archive','Archive','louse','Louse','curve','Curve'
      ]
    end

    it 'should singularize and pluralize given strings'
      for (var i = 0; i < testStrings.length; i++)
        (testStrings[i].plural.singular == testStrings[i]).should.be_true
    end
  end

  describe '#isPlural'
    it 'should be true when plural'
      'people'.isPlural.should.be_true
    end

    it 'should be false when singular'
      'person'.isPlural.should.be_false
    end

    it 'should be true when uncountable'
      'series'.isPlural.should.be_true
    end
  end

  describe '#isSingular'
    it 'should be true when singular'
      'person'.isSingular.should.be_true
    end

    it 'should be false when plural'
      'people'.isSingular.should.be_false
    end

    it 'should be true when uncountable'
      'sheep'.isSingular.should.be_true
    end
  end

  describe '#uppercase'
    it 'should alias toUpperCase()'
      'foo'.uppercase.should.eql 'FOO'
    end
  end

  describe '#lowercase'
    it 'should alias toLowerCase()'
      'FOO'.lowercase.should.eql 'foo'
    end
  end

  describe '#capitalize()'
    describe 'given no arguments'
      it 'should capitalize the first word'
        'foo bar'.capitalize().should.eql 'Foo bar'
      end
    end

    describe 'given true'
      it 'should capitalize all words'
        'foo bar baz'.capitalize(true).should.eql 'Foo Bar Baz'
        'foo bar baz'.capitalize('all').should.eql 'Foo Bar Baz'
      end
    end
  end

  describe '#camelcase'
    describe 'given several words'
      it 'should convert them to camel case'
        'foo bar baz'.camelcase.should.eql 'FooBarBaz'
      end
    end

    describe 'given several words with arbitrary characters'
      it 'should convert them to camel case and disregard the arbitrary characters'
        'foo-bar-baz'.camelcase.should.eql 'FooBarBaz'
        'foo_bar_baz'.camelcase.should.eql 'FooBarBaz'
        'foo-bar_baz'.camelcase.should.eql 'FooBarBaz'
        'base 64-encode'.camelcase.should.eql 'Base64Encode'
      end
    end
  end

  describe '#digits'
    it 'should strip non numeric characters'
      '$100,000'.digits.should.eql '100000'
    end
  end

end
