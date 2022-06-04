const express = require('express')

const router = express.Router()
// Controller
const messageController = require('../controller/message.js')
// Utils
const { isAuth } = require('../controller/auth.js')

router
  .route('/')
  .get(isAuth, messageController.getMessages) // 取得所有訊息

module.exports = router
