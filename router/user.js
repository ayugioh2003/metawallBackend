const express = require('express')

const router = express.Router()
const userController = require('../controller/user.js')
const authController = require('../controller/auth.js')

router
  .route('/')
  .get(authController.login) // 登入
  .post(authController.signup) // 註冊
  .get(authController.logout) // 登出

router
  .route('/users')
  .get(userController.getUserInfo) // 取得個人資訊
  .get(userController.getCurrentUserInfo) // 取得目前資訊
  .patch(userController.updateCurrentUserInfo) // 修改個人資訊
  .patch(authController.resetPassword) // 修改密碼
  .get(userController.getUserList) // 取得用戶列表
  .post(userController.createUserInfo) // 新增個人資訊
  .patch(userController.updateUserInfo) // 修改個人資訊
  .delete(userController.deleteUserInfo) // 刪除個人資訊

module.exports = router
