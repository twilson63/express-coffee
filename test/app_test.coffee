request = require 'supertest'
app = require process.cwd() + '/.app'
puts = (obj) -> 
  console.log(require('treeify').asTree(obj,true))

describe 'General', ->
  describe 'Main page', ->
    it "should be here", (done) ->
      request(app)
        .get("/")
        .send( {} )
        .expect(200, {}, 
                done
        )
  describe 'Ping Pong', ->
    it "should say hello world", (done) ->
      request(app)
        .get("/ping")
        .expect(200, {"hello":["world"]}, done)
    it "should respond with sent data", (done) ->
      pongData = {"pong":"data"}
      query = {"q":"something"}
      id = "4"
      request(app)
        .post("/ping/pong/#{id}?q=something")
        .send(pongData)
        .expect(200, (err, res) ->
          # puts res
          res.body.should.have.property "pongQuery"
          res.body.should.have.property "pongBody"
          res.body.should.have.property "id"
          res.body.pongQuery.should.eql query
          res.body.pongBody.should.eql pongData
          res.body.id.should.equal id
          
          done()
        )