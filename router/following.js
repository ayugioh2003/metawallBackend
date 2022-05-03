const express = require('express')
const router = express.Router()
const followController = require('../controller/following')

router
  .route('/')
  .get(followController.getFollowList) // 取得追蹤名單、取得追蹤者
  .post(followController.createFollow) // 新增追蹤名單
  .delete(followController.deleteFollow) // 刪除追蹤名單

module.exports = router