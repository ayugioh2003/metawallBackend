const express = require('express')
const router = express.Router()
const { isAuth } = require('../controller/auth')
const followController = require('../controller/following')

router
  .route('/')
  .get(isAuth, followController.getFollowList) // 取得追蹤名單、取得追蹤者

router
  .route('/:follow_id')
  .post(isAuth, followController.createFollow) // 新增追蹤名單
  .delete(isAuth, followController.deleteFollow) // 刪除追蹤名單

module.exports = router
