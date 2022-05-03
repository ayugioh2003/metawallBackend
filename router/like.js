const express = require('express')

const router = express.Router()
const likeController = require('../controller/like.js')

router
  .route('/')
  .get(likeController.getLike) // 取得貼文按讚、取得留言按讚
  .patch(likeController.toggleLike) // 切換貼文按讚狀態、切換留言按讚狀態


module.exports = router
