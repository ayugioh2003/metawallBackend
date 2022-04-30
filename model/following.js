const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Follow Model
 * 追蹤模組
*/
const FollowingSchema = new mongoose.Schema({

})

const Following = mongoose.model(FollowingSchema)
module.exports = Following
