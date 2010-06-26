describe 'RegExp'
  describe '.escape()'
    it 'should escape the given string to be used as a RegExp'
      RegExp.escape('[\\w]+').should.equal '\\[\\\\w\\]\\+'
      RegExp.escape('\\{}[]test|()/?^!=:$').should.equal "\\\\\\{\\}\\[\\]test\\|\\(\\)\\/\\?\\^\\!\\=\\:\\$"
    end

    it 'should allow a string of chars to escape'
      RegExp.escape('/path/to/image.png?foo=bar', '. ? = [ ]').should.eql "/path/to/image\\.png\\?foo\\=bar"
    end
  end
end

