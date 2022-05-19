const express = require('express')

const router = express.Router()
// utils
const {verifyToken} = require('../utils/verification')
// Controller
const authController = require('../controller/auth.js')
const userController = require('../controller/user.js')
// 驗證用middleware
const token = (req,res,next)=>{
  const id = req.body.id;
  const token = req.headers.token;
   // 取的token驗證通過解密出來的使用者id
   const verify = await verifyToken(token);
   if (verify && verify === id){
     console.log('驗證通過');
     next();
   }
   else{
     return next(
       new AppError({
         message: '帳號與token不符合',
         statusCode: ApiState.DATA_NOT_EXIST.statusCode,
       })
     );
   }
}

// 登入
router.post('/signup', authController.signup)
// 註冊
router.post('/login', authController.login)
// 登出
router.post('/logout', authController.logout)
// 修改密碼
router.post('/reset-password', authController.resetPassword)
// 驗證token
router.post('/check', authController.checkToken)

module.exports = router
