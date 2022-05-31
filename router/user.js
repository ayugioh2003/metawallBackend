const express = require('express')
const { isAuth } = require('../controller/auth.js')

const router = express.Router()
const userController = require('../controller/user.js')

router
  .route('/')
  .get(isAuth, userController.getUserList) // 取得用戶列表

router
  .route('/current-userinfo')
  .get(isAuth, userController.getCurrentUserInfo) // 取得個人資訊
  .patch(isAuth, userController.updateCurrentUserInfo) // 修改個人資訊

router
  .route('/reset-password')
  .patch(isAuth, userController.resetPassword)// 修改密碼

router
  .route('/:user_id')
  .get(isAuth, userController.getUserInfo) // 取得個人資訊
  .post(isAuth, userController.createUserInfo) // 新增個人資訊
  .patch(isAuth, userController.updateUserInfo) // 修改個人資訊
  .delete(isAuth, userController.deleteUserInfo) // 刪除個人資訊

module.exports = router
