const mongoose = require('mongoose')

/**
 * 後端負責人 灰塵貓
 * User Model
 */

const UserSchema = new mongoose.Schema({

})

const User = mongoose.model('User', UserSchema)

module.exports = User