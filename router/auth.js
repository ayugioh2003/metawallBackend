const express = require('express')

const router = express.Router()
// utils
const { verifyToken } = require('../utils/verification')
// Controller
const authController = require('../controller/auth.js')
const userController = require('../controller/user.js')

// 登入
router.post('/signup', authController.signup)
// 註冊
router.post('/login', authController.login)
// 登出
router.post('/logout', authController.logout)
// 修改密碼
router.post('/reset-password', authController.resetPassword)
// 驗證token
router.get('/check', authController.checkToken)

module.exports = router
