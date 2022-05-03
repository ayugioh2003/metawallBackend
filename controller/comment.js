// Model
// const Comment = require('../model/comment')
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
  取得貼文留言	GET	/comments?post_id
*/
const getComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'getComment' })
})

/*
  新增留言	POST	/comments
*/
const createComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'createComment' })
})

/*
  修改留言	PATCH	/comments
*/
const updateComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'updateComment' })
})

/*
  刪除留言	DELETE	/comments
*/
const deleteComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'deleteComment' })
})

module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment
}