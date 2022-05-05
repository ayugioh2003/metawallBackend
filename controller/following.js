// Model
// const Following = require('../model/following.js')
const ApiState = require('../utils/apiState.js')
const AppError = require('../utils/appError.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const { successHandle } = require('../utils/resHandle.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING.message, ApiState.FIELD_MISSING.statusCode))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  取得追蹤名單 GET /followings?user_id
  取得追蹤者 GET /followers?user_id
*/
const getFollowList = catchAsync(async (req, res, next) => {
  successHandle({ res, message: req.query })
})

/*
  新增追蹤名單 POST /followings
*/
const createFollow = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'createFollow' })
})

/*
  移除追蹤名單 DELETE /followings
*/
const deleteFollow = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'deleteFollow' })
})



module.exports = {
  getFollowList,
  createFollow,
  deleteFollow
}