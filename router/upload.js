const express = require('express')

const router = express.Router()
const uploadController = require('../controller/upload.js')

router
  .route('/')
  .get(uploadController.getUpload) // 取得圖片列表
  .post(uploadController.createUpload) // 上傳圖片


module.exports = router
