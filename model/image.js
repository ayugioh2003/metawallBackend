const mongoose = require('mongoose')

/**
 * Image Model
 * 上傳模組
*/
const ImageSchema = new mongoose.Schema({
  // 圖片網址
  url: {
    type: String,
    required: [true, '圖片網址為必填']
  },

  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
  },

  // 更新時間，轉為 Timestamp 以方便前端好處理
  updatedAt: {
    type: Number,
  },
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Date.now()
  }
})

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image
