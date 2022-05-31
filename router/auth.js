const express = require('express')
const { isAuth } = require('../controller/auth.js')

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
// 驗證token
router.get('/check', authController.checkToken)

module.exports = router
