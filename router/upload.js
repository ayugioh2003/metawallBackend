const express = require('express')
const router = express.Router()
// Controller
const uploadController = require('../controller/upload.js')
// Utils
const { uploadModule } = require('../utils/upload')

router
  .route('/')
  .get(uploadController.getUpload) // 取得圖片列表
  .post(uploadModule.single('url'), uploadController.createUpload) // 上傳圖片

module.exports = router
