const express = require('express')

const router = express.Router()
// Controller
const likeController = require('../controller/like.js')
// Utils
const { isAuth } = require('../controller/auth.js')

router
  .route('/')
  .get(isAuth, likeController.getLike) // 取得貼文按讚、取得留言按讚
  .patch(isAuth, likeController.toggleLike) // 切換貼文按讚狀態、切換留言按讚狀態

module.exports = router
