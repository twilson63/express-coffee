var assert = require("assert"),
  multipart = require("../lib/multipart"),
  sys = require("sys");

writer = multipart.writer();

sys.debug("Create a multipart writer.");
sys.debug("");
assert.notEqual(writer, null, "should be able to obtain writer");

function output(msg) {
	sys.debug("  writer " + msg + ".");
}

// Some simple parts we will use
var goodSimplePart = { "content-disposition": "multipart-form"
, "content-type": "text/plain"
, "filename": "foo.txt"
}, badSimplePart = { "content-disposition": "multipart-form"
, "content-type": "text/plain"
, "filename": "foo.txt"
};

errorHandlerCalled = false;
errorMessage = "";
lastChunk = "";

function handleError (err) {
	assert.notEqual(err.message, undefined, "should pass Error object to onError handler");
	errorMessage = err.message;
	output("emitted error: " + errorMessage);
	errorHandlerCalled = true;
}
function handleErrorCleanup (err) {
  handleError(err);
  delete this.error;
}

function handleData (chunk) {
	lastChunk = chunk
	output("emitted data");
}

writer.onError = handleError;
writer.onData = handleData;

sys.debug("Test some general error handling.")
sys.debug("Wrong - write a part without setting boundary...");
writer.partBegin(goodSimplePart);
assert.ok(errorHandlerCalled, "should emit onError if part written without boundary");

sys.debug("Fix the last error.  Set the boundary property.");
writer.boundary  = "boundary";
sys.debug("But leave the error object...")
try {
	writer.partBegin(goodSimplePart);
	assert.ok(false, "should throw error if not cleaned up from last call");
}
catch (error) {
	output("threw: " + error.message);
}

sys.debug("Cleanup the error. Set the error to null.");
writer.error = null;
writer.partBegin(goodSimplePart);
