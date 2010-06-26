
md5 = require('ext/md5')

describe 'md5'
  describe '.hash()'
    it 'should return an md5 hash of the given string'
      md5.hash('foobar').should.eql '3858f62230ac3c915f300c664312c63f'
      md5.hash('wahoo').should.eql 'e493298061761236c96b02ea6aa8a2ad'
      md5.hash('123?&foo').should.eql 'b8993dfc834b9c0feef2f22505c0425b'
    end
  end
end

