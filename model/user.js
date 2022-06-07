const mongoose = require('mongoose')
const validator = require('validator')

/**
 * User Model
 * 用戶管理模組
 */

const UserSchema = new mongoose.Schema(
  {
    // 暱稱
    name: {
      type: String,
      required: [true, '暱稱為必填'],
      minlength: 2,
    },

    // Email
    email: {
      type: String,
      required: [true, 'Email 為必填'],
      unique: true,
      validate: [validator.isEmail, 'Email 格式錯誤'],
    },

    // 密碼
    password: {
      type: String,
      required: [true, '密碼為必填'],
      min: [8, '密碼至少 8 碼以上'],
      trim: true,
      select: false, // Never Show to user
    },

    // 性別
    gender: {
      type: String,
      required: false,
      enum: {
        values: ['male', 'female'],
        message: '不接受 {VALUE}，僅接受 male, female',
      },
    },

    // 大頭照
    // TODO: 驗證解析度寬度至少 300、圖片寬高比 1:1
    avatar: {
      type: String,
      required: false,
      default: ' ',
    },

    // 追蹤名單
    followings: [
      {
        _id: false,
        user: { type: mongoose.Schema.ObjectId, ref: 'User' },
        createdAt: {
          type: Number,
          default: () => Date.now(),
        },
      },
    ],

    // 被追蹤名單
    followers: [
      {
        _id: false,
        user: { type: mongoose.Schema.ObjectId, ref: 'User' },
        createdAt: {
          type: Number,
          default: () => Date.now(),
        },
      },
    ],
    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },
    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
    },

    // ws聊天室資料model
    // 存訊息ID
    // messages: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Message',
    //   },
    // ],
    // 存聊天室ID
    chatrooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Chatroom',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => Date.now(),
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

UserSchema.virtual('messages', {
  ref: 'Message',
  foreignField: 'user',
  localField: '_id',
})

const User = mongoose.model('User', UserSchema)

module.exports = User
