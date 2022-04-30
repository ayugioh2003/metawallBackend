const express = require('express')

const router = express.Router()
const postController = require('../controller/post.js')

router
  .route('/')
  .get(postController.getPost)
  .post(postController.createPost)

module.exports = router
