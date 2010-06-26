
var multipart = require("../lib/multipart")
  , assert = require("assert")
  , sys = require("sys")
  , fixture = require("./fixture")
  , testPart = function (expect, part) {
      sys.debug("test part: "+sys.inspect(expect));
      if (!expect) {
        throw new Error("Got more parts than expected: "+
          sys.inspect(part.headers));
      }
      for (var i in expect) {
        assert.equal(expect[i], part[i]);
      }
    }
  , messages = fixture.messages
  , p = multipart.parser()
  , expect
  , e
  ;

p.onPartBegin = function (part) {
  testPart(expect[e++], part);
}

for (var i = 0, l = messages.length; i < l; i ++) {
  var message = messages[i]
    , expect = message.expect
    , e = 0
    , body = message.body
    , b = ""
    , c = 0
    ;
  p.headers = message.headers;
  while (b = body.charAt(c++)) p.write(b);
  p.close();
}

// again, but this time, instead of using the headers, just set the boundary.
for (var i = 0, l = messages.length; i < l; i ++) {
  var message = messages[i]
    , expect = message.expect
    , e = 0
    , body = message.body
    , b = ""
    , c = 0
    ;
  p.boundary = message.boundary;
  while (b = body.charAt(c++)) p.write(b);
  p.close();
}

