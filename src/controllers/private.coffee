module.exports = 

	# Lists all posts
	index: (req, res) ->
		res.send 'This is a private page.'

	# Create a session
	create: (req, res) ->
		req.session.authorized = 'test'
		res.redirect '/private'

	# Destroy a session
	destroy: (req, res) ->
		delete req.session.authorized
		res.redirect '/private'
			
		