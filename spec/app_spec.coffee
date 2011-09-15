require '../lib/app'
request = require('request')

root_uri = 'http://localhost:8000'

describe 'APP Routes', ->
  it 'GET /', ->
    request uri: "#{root_uri}/", (req, resp) ->
      expect(resp.statusCode).toEqual(200)
      asyncSpecDone()
    asyncSpecWait()