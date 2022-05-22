const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    // 使用者ID
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, '使用者ID為必填'],
    },

    // 貼文內容
    content: {
      type: String,
      required: [true, '貼文內容為必填'],
    },

    // 貼文圖片
    image: {
      type: String,
      default: '',
    },

    // 貼文留言
    comments: {
      type: Array,
      default: [],
    },

    // 貼文按讚使用者
    likes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    }],

    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },

    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => Date.now(),
    },
  },
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
