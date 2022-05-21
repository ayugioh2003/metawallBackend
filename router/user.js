const express = require('express')

const router = express.Router()
const userController = require('../controller/user.js')

router
  .route('/')
  .get(userController.getUserList) // 取得用戶列表

router
  .route('/current-userinfo')
  .get(userController.getCurrentUserInfo) // 取得個人資訊
  .patch(userController.updateCurrentUserInfo) // 修改個人資訊

router
  .route('/:user_id')
  .get(userController.getUserInfo) // 取得個人資訊
  .post(userController.createUserInfo) // 新增個人資訊
  .patch(userController.updateUserInfo) // 修改個人資訊
  .delete(userController.deleteUserInfo) // 刪除個人資訊

module.exports = router
