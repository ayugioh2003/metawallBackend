// Model
const User = require('../model/user')
// Utils
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { successHandle } = require('../utils/resHandle.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/


/*
  登入功能	POST	/login
*/
const login = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登入成功' })
})

/*
  註冊功能	POST	/signup
*/
const signup = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '註冊成功' })
})

/*
  登出功能	GET	/logout
*/
const logout = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登出成功' })
})

/*
  修改密碼	PATCH	/reset-password
*/
const resetPassword = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '修改密碼成功' })
})

module.exports = {
  login,
  signup,
  logout,
  resetPassword
}