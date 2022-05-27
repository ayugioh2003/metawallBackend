const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Follow Model
 * 追蹤模組
*/
const FollowingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    following: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
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

const Following = mongoose.model('Following', FollowingSchema)
module.exports = Following
