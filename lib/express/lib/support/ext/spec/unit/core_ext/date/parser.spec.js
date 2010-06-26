
parse = require('ext/core_ext/date').parse

describe 'date'
  describe '#parse()'
    it 'should pass self as "now"'
      var date = new Date('May 2, 2001')
      date.parse('in two years').year.should.eql 2003
    end
  end

  describe 'parse()'
    describe 'today'
      it 'should work'
        var now = new Date
        parse('today', now).should.eql now
      end
    end

    describe 'yesterday'
      it 'should work'
        var date = parse('yesterday', new Date('May 2, 2001'))
        date.toString().should.match(/^Tue May 01/)
      end
    end

    describe 'in <number> <quantifier>'
      describe 'given "a"'
        it 'should work'
          var date = parse('in a day', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 02/)
        end
      end

      describe 'given a single numerical word'
        it 'should work'
          var date = parse('in one day', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 02/)

          var date = parse('in two days', new Date('May 1, 2001'))
          date.toString().should.match(/^Thu May 03/)

          var date = parse('in six days', new Date('May 1, 2001'))
          date.toString().should.match(/^Mon May 07/)

          var date = parse('in sixteen days', new Date('May 1, 2001'))
          date.toString().should.match(/^Thu May 17/)
        end
      end

      describe 'given a numerical word and suffix'
        it 'should work'
          var date = parse('in five hundred days', new Date('May 1, 2001'))
          date.toString().should.match(/^Fri Sep 13 2002/)
        end
      end

      describe 'given a prefix, numerical word'
        it 'should work'
          var date = parse('in twenty two days', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 23/)
        end
      end

      describe 'given a prefix, numerical word and suffix'
        it 'should work'
          var date = parse('in twenty three million minutes', new Date('May 1, 2001'))
          date.year.should.eql 2045
        end
      end

      describe 'given a numerical word followed by "and a half"'
        it 'should work'
          var date = parse('in three and a half days', new Date('May 1, 2001'))
          date.toString().should.match(/^Fri May 04 2001 12:00:00/)
        end
      end

      describe 'given <number>'
        describe 'given <quantifier>'
          it 'should work'
            var date = parse('in 2 days', new Date('May 1, 2001'))
            date.toString().should.match(/^Thu May 03/)
            var date = parse('in 3 years', new Date('May 1, 2001'))
            date.year.should.eql 2004
          end
        end

        describe 'omitting <quantifier>'
          it 'should throw an error'
            -{ parse('in 2') }.should.throw_error(/expected quantifier after number/)
            -{ parse('in 2 monday') }.should.throw_error(/expected quantifier after number/)
          end
        end
      end

      describe 'omitting <number>'
        it 'should throw an error'
          -{ parse('in') }.should.throw_error(/expected number after in/)
          -{ parse('in monday') }.should.throw_error(/expected number after in/)
        end
      end
    end

    describe '<day>'
      it 'should work like "next <day>"'
        parse('thursday').day.should.eql 4
      end
    end

    describe 'next <day>'
      describe 'given a <day>'
        it 'should work with "monday"'
          var date = parse('next monday', new Date('Apr 29, 2001'))
          date.toString().should.match(/^Mon Apr 30/)
        end

        it 'should work with "tuesday"'
          var date = parse('next tuesday', new Date('May 1, 2001'))
          date.toString().should.match(/^Tue May 08/)
        end

        it 'should work with "wednesday"'
          var date = parse('next wednesday', new Date('May 1, 2001'))
          date.toString().should.match(/^Wed May 02/)
        end

        it 'should work with "thursday"'
          var date = parse('next thursday', new Date('May 1, 2001'))
          date.toString().should.match(/^Thu May 03/)
        end

        it 'should work with "friday"'
          var date = parse('next friday', new Date('May 1, 2001'))
          date.toString().should.match(/^Fri May 04/)
        end

        it 'should work with "saturday"'
          var date = parse('next saturday', new Date('May 1, 2001'))
          date.toString().should.match(/^Sat May 05/)
        end

        it 'should work with "sunday"'
          var date = parse('next sunday', new Date('May 1, 2001'))
          date.toString().should.match(/^Sun May 06/)
        end

        it 'should work when the same day'
          var date = parse('next tuesday', new Date('May 1, 2001'))
          date.toString().should.match(/^Tue May 08/)
        end

        it 'should work when moving to the next week'
          var date = parse('next tuesday', new Date('May 3, 2001'))
          date.toString().should.match(/^Tue May 08/)
        end
      end

      describe 'omitting <day>'
        it 'should throw an error'
          -{ parse('next') }.should.throw_error(/expected day after next/)
          -{ parse('next next') }.should.throw_error(/expected day after next/)
        end
      end
    end

  end
end
