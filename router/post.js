const express = require('express')

const router = express.Router()
const postController = require('../controller/post.js')
const authController = require('../controller/auth.js')

router
  .route('/')
  .get(authController.isAuth, postController.getPost) // 取得貼文列表
  .post(authController.isAuth, postController.createPost) // 新增貼文

router
  .route('/:post_id')
  .get(authController.isAuth, postController.getSinglePost) // 取得單一貼文
  .patch(authController.isAuth, postController.updateSinglePost) // 修改單一貼文
  .delete(authController.isAuth, postController.deleteSinglePost) // 刪除單一貼文

module.exports = router
