describe 'Error'
  describe '.raise()'
    it 'should raise/throw an error'
      -{ Error.raise('TestException') }.should.throw_error 'TestException', 'Undefined exception'
      -{ Error.raise('AnotherTestException', 'A test exception') }.should.throw_error 'AnotherTestException', 'A test exception'
    end
  end
end
