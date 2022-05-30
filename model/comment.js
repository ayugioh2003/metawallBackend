const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')
const Post = require('./post')

/**
 * Comments Model
 * 留言模組
*/
const CommentSchema = new mongoose.Schema(
  {
    // 留言內容
    content: {
      type: String,
      require: [true, '內容為必填'],
    },
    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
      default: Date.now,
    },
    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
      default: Date.now,
    },
    // 關聯－user
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, '使用者ID必填'],
      ref: 'User',
    },
    // 關聯－post
    post: {
      type: mongoose.Schema.ObjectId,
      required: [true, '貼文ID必填'],
      ref: 'Post',
    },
  },
  {
    versionKey: false,
  },
)

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '_id name avatar',
  })

  next()
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
