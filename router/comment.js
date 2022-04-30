const express = require('express')
const router = express.Router()
// Controller
const commentController = require('../controller/comment.js')

router.get('/:post_id', commentController.getComment) // 取得貼文留言

router
  .route('/')
  .post(commentController.createComment) // 新增留言
  .patch(commentController.updateComment) // 修改留言
  .delete(commentController.deleteComment) // 刪除留言


module.exports = router