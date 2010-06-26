# multipart-js

A JavaScript library for parsing and writing multipart messages.

## Current State

Pre-pre-alpha.  Almost nothing is here, and what is here is likely completely broken.

## Usage

If you're familiar with [sax-js](http://github.com/isaacs/sax-js), then most of this should
be pretty straightforward.  Attach event handlers, call functions, close it when you're
done.  Please keep fingers and dangling clothing away from the state machine.

    var multipart = require("multipart");
    
    // parsing
    var parser = multipart.parser();
    
    // in all event handlers, "this" is the parser, and "this.part" is the
    // part that's currently being dealt with.
    parser.onpartbegin = function (part) { doSomething(part) };
    parser.ondata = function (chunk) { doSomethingElse(chunk) };
    parser.onend = function () { closeItUp() };
    
    // now start feeding the message through it.
    // you can do this all in one go, if you like, or one byte at a time,
    // or anything in between.
    parser.boundary = "foo";
    var chunk;
    while ( chunk = upstreamThing.getNextChunk() ) {
      parser.write(chunk);
    }
    parser.close();
    
    
    // writing
    var writer = multipart.writer();
    
    // attach event handlers for the things we care about.
    writer.ondata = function (chunk) { doSomething(chunk) };
    writer.onend = function () { closeItUp() };
    
    // now trigger the events to fire by feeding files through it.
    writer.boundary = "foo";
    writer.partBegin({ "content-type" : "text/plain", filename : "foo.txt" });
    var chunk;
    while ( chunk = getChunkOfFile() ) {
      writer.write(chunk);
    }
    writer.partEnd();
    writer.close();
