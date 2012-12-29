request = require 'supertest'
app = require process.cwd() + '/.app'


describe 'General', ->
  describe 'Main page', ->
    it "should be here", (done) ->
      request(app)
        .get("/")
        .send( {} )
        .expect(200, {}, 
                done
        )