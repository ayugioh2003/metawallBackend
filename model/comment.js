const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Comments Model
 * 留言模組
*/
const CommentSchema = new mongoose.Schema({
  // 留言內容
  content: {
    type: String,
    require: [true, '內容為必填']
  }
})

const Comment = mongoose.model(CommentSchema)
module.exports = Comment