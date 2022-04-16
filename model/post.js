const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  // 發文者名稱
  userName: {
    type: String,
    required: [true, '發文者姓名為必填']
  },
  // 發文內容
  userContent: {
    type: String,
    required: [true, '內容為必填']
  },
  // 使用者圖片
  userPhoto: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false, timestamps: true })

const Post = model('Post', PostSchema)

module.exports = Post