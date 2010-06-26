
sprintf = require('ext').sprintf

describe 'sprintf()'
  describe '%'
    it 'should be literal'
      sprintf('%').should.eql '%'
    end
  end

  describe 'given an invalid specifier'
    it 'should throw an error'
      -{ sprintf('%L') }.should.throw_error(/%L is not a valid specifier/)
    end
  end

  describe '%c'
    describe 'when given a string'
      it 'should output a single character'
        sprintf('%c', 'a').should.eql 'a'
        sprintf('%c', 'abc').should.eql 'a'
      end
    end

    describe 'when given an integer'
      it 'should output its character'
        sprintf('%c', 102).should.eql 'f'
        sprintf('%c', 111).should.eql 'o'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5c', '12').should.eql '    1'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%c', {}) }.should.throw_error
        -{ sprintf('%c', []) }.should.throw_error
        -{ sprintf('%c', String) }.should.throw_error
      end
    end
  end

  describe '%d'
    describe 'when given a string'
      it 'should convert to an integer'
        sprintf('%d', '12').should.eql '12'
        sprintf('%d', '-12').should.eql '-12'
      end
    end

    describe 'when given a non-numeric string'
      it 'should throw an error'
        -{ sprintf('%d', 'foo') }.should.throw_error
      end
    end

    describe 'when given an int'
      it 'should output it'
        sprintf('%d', 12).should.eql '12'
      end
    end

    describe 'when given a float'
      it 'should convert to an integer'
        sprintf('%d', 12.3).should.eql '12'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5d', 12).should.eql '   12'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%d', {}) }.should.throw_error
        -{ sprintf('%d', []) }.should.throw_error
        -{ sprintf('%d', String) }.should.throw_error
      end
    end
  end

  describe '%D'
    describe 'when given a string'
      it 'should convert to an ordinalized integer'
        sprintf('%D', '12').should.eql '12th'
        sprintf('%D', '2').should.eql '2nd'
      end
    end

    describe 'when given a non-numeric string'
      it 'should throw an error'
        -{ sprintf('%D', 'foo') }.should.throw_error
      end
    end

    describe 'when given an int'
      it 'should output it'
        sprintf('%D', 3).should.eql '3rd'
      end
    end

    describe 'when given a float'
      it 'should convert to an integer'
        sprintf('%D', 12.3).should.eql '12th'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5D', '12').should.eql ' 12th'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%d', {}) }.should.throw_error
        -{ sprintf('%d', []) }.should.throw_error
        -{ sprintf('%d', String) }.should.throw_error
      end
    end
  end

  describe '%-5d'
    it 'should pad right'
      sprintf('%-5d', 5).should.eql '5    '
      sprintf('%-5d', 500).should.eql '500  '
    end
  end

  describe '%s'
    it 'should convert to a string'
      sprintf('%s', 'foo').should.eql 'foo'
      sprintf('%s', 12).should.eql '12'
      sprintf('%s', 12.99).should.eql '12.99'
      sprintf('%s', { foo: 'bar' }).should.eql '[object Object]'
      sprintf('%s', [1,2]).should.eql '1,2'
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5s', '12').should.eql '   12'
      end
    end
  end

  describe '%b'
    describe 'when given a number'
      it 'should convert to binary'
        sprintf('%b', 5).should.eql '101'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5b', 5).should.eql '  101'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%b', {}) }.should.throw_error
        -{ sprintf('%b', []) }.should.throw_error
        -{ sprintf('%b', String) }.should.throw_error
      end
    end
  end

  describe '%o'
    describe 'when given a number'
      it 'should convert to octal'
        sprintf('%o', 7).should.eql '7'
        sprintf('%o', 8).should.eql '10'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5o', 7).should.eql '    7'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%o', {}) }.should.throw_error
        -{ sprintf('%o', []) }.should.throw_error
        -{ sprintf('%o', String) }.should.throw_error
      end
    end
  end

  describe '%x'
    describe 'when given a number'
      it 'should convert to lowercase hex'
        sprintf('%x', 255).should.eql 'ff'
        sprintf('%x', 16).should.eql '10'
      end

      describe '< F'
        it 'should pad with 0'
          sprintf('%x', 15).should.eql '0f'
          sprintf('%x', 5).should.eql '05'
        end
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5x', 255).should.eql '   ff'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%x', {}) }.should.throw_error
        -{ sprintf('%x', []) }.should.throw_error
        -{ sprintf('%x', String) }.should.throw_error
      end
    end
  end

  describe '%X'
    describe 'when given a number'
      it 'should convert to uppercase hex'
        sprintf('%X', 255).should.eql 'FF'
        sprintf('%X', 16).should.eql '10'
      end

      describe '< F'
        it 'should pad with 0'
          sprintf('%X', 15).should.eql '0F'
          sprintf('%X', 5).should.eql '05'
        end
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5X', 255).should.eql '   FF'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%X', {}) }.should.throw_error
        -{ sprintf('%X', []) }.should.throw_error
        -{ sprintf('%X', String) }.should.throw_error
      end
    end
  end

  describe '%M'
    describe 'when given a string'
      it 'should convert to an MD5 hash'
        sprintf('%M', 'foobar').should.eql '3858f62230ac3c915f300c664312c63f'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%34M', 'foobar').should.eql '  3858f62230ac3c915f300c664312c63f'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%M', {}) }.should.throw_error
        -{ sprintf('%M', []) }.should.throw_error
        -{ sprintf('%M', String) }.should.throw_error
      end
    end
  end

  describe '%C'
    describe 'when given a float'
      it 'should output a currency formatted string'
        sprintf('%C', 1000.99).should.eql '1,000.99'
      end

      describe 'when more than 2 decimal places'
        it 'should fix to 2'
          sprintf('%C', 1000.1234).should.eql '1,000.12'
        end
      end
    end

    describe 'when given an integer'
      it 'should append .00'
        sprintf('%C', 1000).should.eql '1,000.00'
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%10C', 25).should.eql '     25.00'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%C', {}) }.should.throw_error
        -{ sprintf('%C', []) }.should.throw_error
        -{ sprintf('%C', String) }.should.throw_error
      end
    end
  end

  describe '%f'
    describe 'when given a float'
      it 'should output the float'
        sprintf('%f', 5.99).should.eql '5.99'
        sprintf('%f', -5.99).should.eql '-5.99'
      end
    end

    describe 'when given a numeric string'
      it 'should convert to a float float'
        sprintf('%f', '5.99').should.eql '5.99'
      end
    end

    describe 'with precision'
      it 'should pad decimal places'
        sprintf('%.2f', 5).should.eql '5.00'
        sprintf('%.4f', 5).should.eql '5.0000'
        sprintf('%.2f', 55.9).should.eql '55.90'
        sprintf('%.4f', 555.95).should.eql '555.9500'
      end

      it 'should restrict decimal places'
        sprintf('%.2f', 5.1234).should.eql '5.12'
        sprintf('%.1f', 55.1234).should.eql '55.1'
      end

      describe 'when padded'
        it 'should be padded'
          sprintf('%10.4f', 5.99).should.eql '    5.9900'
        end
      end
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('%5f', 5.99).should.eql ' 5.99'
      end
    end

    describe 'when given an arbitrary object'
      it 'should throw an error'
        -{ sprintf('%f', {}) }.should.throw_error
        -{ sprintf('%f', []) }.should.throw_error
        -{ sprintf('%f', String) }.should.throw_error
      end
    end
  end

  describe 'given multiple'
    it 'should substitute globally'
      sprintf('%s, %s', 'foo', 'bar').should.eql 'foo, bar'
    end

    describe 'when padded'
      it 'should be padded'
        sprintf('[%5s:%-5s]', 'foo', 'bar').should.eql '[  foo:bar  ]'
      end
    end
  end
end

