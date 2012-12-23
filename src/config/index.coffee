# === config file for the whole APP ===

###
exports.DEBUG_LOG: log  debug info when nothing is wrong
exports.DEBUG_WARN: when there is an abnormality caused by user, e.g. a malicious URL
exports.DEBUG_ERROR: things should never happen. like a DB error
exports.DEBUG_CLIENT: print debug info to browser's console 
things prefixed with DB_: database stuff
###

# === set parameters based on environment ===
exports.setEnvironment = (env) ->
	console.log "set app environment: #{env}"
	switch(env)
		when "development"
			exports.DEBUG_LOG=true
			exports.DEBUG_WARN=true
			exports.DEBUG_ERROR=true
			exports.DEBUG_CLIENT=true
			exports.DB_HOST = 'localhost'
			exports.DB_PORT = "3306"
			exports.DB_NAME = 'mvc_example'
			exports.DB_USER = 'root'
			exports.DB_PASS = 'root'

		when "testing"
			exports.DEBUG_LOG=true
			exports.DEBUG_WARN=true
			exports.DEBUG_ERROR=true
			exports.DEBUG_CLIENT=true

		when "production"
			exports.DEBUG_LOG=false
			exports.DEBUG_WARN=false
			exports.DEBUG_ERROR=true
			exports.DEBUG_CLIENT=false
		else
			console.log "environment #{env} not found"