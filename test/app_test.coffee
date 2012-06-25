request = require 'request'
describe 'Sample test', ->
  it 'should be true', ->
    true.should.equal true

describe 'GET /', ->
  response = null
  before (done) ->
    request 'http://localhost:3000', (e, r, b) ->
      response = r
      done()

  it 'should return 200', (done) ->
    response.statusCode.should.equal 200
    done()
    