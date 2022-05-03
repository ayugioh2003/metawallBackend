// Model
const User = require('../model/user.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/


/* 取得目前資訊	GET	/users/current-userinfo */
const getCurrentUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '取得目前資訊成功' })
})

/* 修改個人資訊	PATCH	/users/current-userinfo */
const updateCurrentUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '修改個人資訊成功' })
})

/* 取得個人資訊 GET	/users/:user_id */
const getUserInfo = catchAsync(async (req, res, next) => {
  return next(new AppError(ApiState.FIELD_MISSING))
})

/* 取得用戶列表	GET	/users */
const getUserList = catchAsync(async (req, res, next) => {
  return next(new AppError(ApiState.FIELD_MISSING))
})

/* 新增個人資訊 POST /users/:user_id */
const createUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '成功' })
})

/* 刪除個人資訊 DELETE /users/:user_id */
const deleteUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '成功' })
})

/* 修改個人資訊 PATCH /users/:user_id */
const updateUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '成功' })
})


module.exports = {
  getUserInfo,
  getCurrentUserInfo,
  updateCurrentUserInfo,
  getUserList,
  createUserInfo,
  deleteUserInfo,
  updateUserInfo
}
