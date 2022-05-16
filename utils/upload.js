// Package
const axios = require('axios')
const FormData = require('form-data');
const multer = require('multer')
// API
const uploadApiUrl = 'https://api.imgur.com/3/upload'

// 上傳圖片，設定格式
const uploadModule = multer({
  // 限制檔案需 10 MB內
  limit: {
    fileSize: 10000000
  },
  // 只接受三種圖片格式
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('僅接受 jpg, jpeg, png 格式'))
    }
    cb(null, true)
  }
})

// 向 Imgur API 請求上傳圖案
const uploadImge = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('type', 'base64')

  return axios({
    method: 'POST',
    url: uploadApiUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    data: formData
  })
}

module.exports = {
  uploadModule,
  uploadImge
}