const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Image Model
 * 上傳模組
*/
const ImageSchema = new mongoose.Schema({

})

const Image = mongoose.model(ImageSchema)
module.exports = Image
