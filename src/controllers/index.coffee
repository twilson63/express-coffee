# Just renders index.jade

exports.index = (req,data,render)->
	data.someData = "some value"
	render false