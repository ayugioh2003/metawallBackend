/* eslint-disable no-unused-vars */
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING.message, ApiState.FIELD_MISSING.statusCode))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  取得貼文按讚 GET /likes?post_id={post_id}
  取得留言按讚 GET /likes?comment_id={comment_id}
*/
const getLike = catchAsync(async (req, res, next) => {
  // TODO: 根據 query 給的參數不同，做取得貼文按讚 / 取得留言按讚
  successHandle({ res, message: 'getLike' })
})

/*
  切換貼文按讚狀態 PATCH /likes
  切換留言按讚狀態 PATCH /likes
*/

const toggleLike = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'toggleLike' })
})


/*
  取得用戶按讚貼文 GET /posts?like_user_id
*/
const getUserLike = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'getUserLike' })
})

module.exports = {
  getLike,
  toggleLike,
  getUserLike,
}
