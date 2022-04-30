const express = require('express')

const router = express.Router()
const postController = require('../controller/post.js')

router
  .route('/')
  .get(postController.getPost) // 取得貼文列表
  .post(postController.createPost) // 新增貼文

router
  .route('/:post_id')
  .get(postController.getSinglePost) // 取得單一貼文
  .patch(postController.updateSinglePost) // 修改單一貼文
  .delete(postController.deleteSinglePost) // 刪除單一貼文

module.exports = router
