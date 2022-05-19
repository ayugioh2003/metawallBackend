const express = require('express')
const router = express.Router()
// Controller
const commentController = require('../controller/comment.js')

// router
  // .route('/:post_id')
  // .get(commentController.getComment) // 取得貼文留言 params
  
router
  // TODO: 要記得加上驗證
  // .route('/', isAuth) // 驗證(我不知道是不是這個寫法，我先測看看XD)
  .route('/')
  .get(commentController.getComment) // 取得貼文留言?post_id
  .post(commentController.createComment) // 新增留言
  .patch(commentController.updateComment) // 修改留言
  .delete(commentController.deleteComment) // 刪除留言
  

module.exports = router