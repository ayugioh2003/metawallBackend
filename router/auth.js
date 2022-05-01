const express = require('express')

const router = express.Router()
// Controller
const authController = require('../controller/auth.js')
const userController = require('../controller/user.js')

// 登入
router.post('/signup', authController.login)
// 註冊
router.post('/login', authController.signup)
// 登出
router.post('/logout', authController.logout)
// 修改密碼
router.post('/reset-password', authController.resetPassword)

module.exports = router
