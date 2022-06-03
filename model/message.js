const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, '訊息內容需填寫'],
    },
    type: {
      type: String,
      require: [true, '訊息種類必填'],
      enum: {
        values: ['global-message', 'notification'],
        message: '僅接受 global-message, notification',
      },
    },
    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },
    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chatrooms: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chatroom',
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => Date.now(),
    },
  },
)

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
