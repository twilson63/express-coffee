mongoose = require 'mongoose'

# User model
User = new mongoose.Schema(
<<<<<<< Local Changes
  s: String
  body: String
  url: String
=======
  someField: String
>>>>>>> External Changes
)

module.exports = mongoose.model 'User', User