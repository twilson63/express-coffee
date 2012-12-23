puts = require 'puts'
request = require 'supertest'

Post = require process.cwd() + '/.app/models/Post'
app = require process.cwd() + '/.app'

describe 'Post', ->
  before (done) ->
    Post.remove {}, ->
      done()
  it "should be created", (done) ->
    postData = {
      "title":"SomeTitle",
      "body":"body of post",
      "url":"some url"
    }
    request(app)
      .post("/posts/create")
      .send(postData)
      .expect(201, (err, res) ->
      
        res.body.should.include(postData)
        res.body.should.have.property "_id"
        res.body["_id"].should.be.ok
        done()
      )