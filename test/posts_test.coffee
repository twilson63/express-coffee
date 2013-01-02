request = require 'supertest'

Post = require process.cwd() + '/.app/models/post'
app = require process.cwd() + '/.app'


POST_DATA = {
  "title":"SomeTitle",
  "body":"body of post",
  "url":"some url"
}

UPDATED_POST_DATA = {
  "title":"Another title",
  "body":"another body of post",
  "url":"some another url"
}

cleanDB = (done) ->
  Post.remove {}, ->
    done()

describe 'Post', ->
  before cleanDB
  
  post_id = null
      
  it "should be created", (done) ->
    request(app)
      .post("/posts/create")
      .send(POST_DATA)
      .expect 201, (err, res) ->
        res.body.should.include(POST_DATA)
        res.body.should.have.property "_id"
        res.body["_id"].should.be.ok
        post_id = res.body["_id"]
        done()
        
  it "should be accessible by id", (done) ->
    request(app)
      .get("/posts/get/#{post_id}")
      .expect 200, (err, res) ->
        res.body.should.include(POST_DATA)
        res.body.should.have.property "_id"
        res.body["_id"].should.be.eql post_id
        done()
        
  it "should be listed in list", (done) ->
    request(app)
      .get("/posts")
      .expect 200, (err, res) ->
        res.body.should.be.an.instanceof Array
        res.body.should.have.length 1
        res.body[0].should.include(POST_DATA)
        done()
    
  it "should be updated", (done) ->
    request(app)
      .post("/posts/update/#{post_id}")
      .send(UPDATED_POST_DATA)
      .expect 200, (err, res) ->
        res.body.should.include(UPDATED_POST_DATA)
        done()
        
  it "should be persisted after update", (done) ->
    request(app)
      .get("/posts/get/#{post_id}")
      .expect 200, (err, res) ->
        res.body.should.include(UPDATED_POST_DATA)
        res.body.should.have.property "_id"
        res.body["_id"].should.be.eql post_id
        done()
  
  it "should be removed", (done) ->
    request(app)
      .del("/posts/delete/#{post_id}")
      .expect 200, (err, res) ->
        done()
    
  it "should not be listed after remove", (done) ->
    request(app)
      .get("/posts")
      .expect 200, (err, res) ->
        res.body.should.be.an.instanceof Array
        res.body.should.have.length 0
        done()
        
  after cleanDB
      