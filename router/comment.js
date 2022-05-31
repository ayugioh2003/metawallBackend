const express = require('express')
const { isAuth } = require('../controller/auth.js')

const router = express.Router()
// Controller
const commentController = require('../controller/comment.js')

router.get('/:post_id', isAuth, commentController.getComment) // 取得貼文留言

router
  .route('/')
  .post(isAuth, commentController.createComment) // 新增留言
  .patch(isAuth, commentController.updateComment) // 修改留言
  .delete(isAuth, commentController.deleteComment) // 刪除留言

module.exports = router
