/* eslint-disable camelcase */
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState.js')
// Model
const Post = require('../model/post.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

// 取得貼文按讚
const getPostLikes = catchAsync(async (req, res, next) => {
  const { post_id } = req.query

  const post = await Post.findById(post_id).select('_id likes')
  if (!post) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({
    res,
    data: {
      likeCount: post.likes.length,
      post,
    },
  })
})

// 取得留言按讚
const getCommentLikes = catchAsync(async (req, res, next) => {

})

// 切換[貼文]按讚狀態 PATCH /likes?post_id={post_id}
const patchPostLikes = catchAsync(async (req, res, next) => {
  const { post_id, toggle_type } = req.query
  let post = {}

  // 按讚
  if (toggle_type === 'add') {
    post = await Post.findOneAndUpdate(
      { _id: post_id },
      { $addToSet: { likes: req.user.id } },
      { new: true }, // 回傳最新改過的資料
    )
  }

  // 取消讚
  if (toggle_type === 'remove') {
    post = await Post.findByIdAndUpdate(
      { _id: post_id },
      { $pull: { likes: req.user.id } },
      { new: true }, // 回傳最新改過的資料
    )
  }

  // 檢查貼文是否存在
  if (!post) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({
    res,
    data: {
      likeCount: post.likes.length,
      post,
    },
  })
})

// 切換[留言]按讚狀態
const patchCommentLikes = catchAsync(async (req, res, next) => {

})

/*
  根據 query 給的參數不同，做取得貼文按讚 / 取得留言按讚

  - 取得貼文按讚 GET /likes?post_id={post_id}
  - 取得留言按讚 GET /likes?comment_id={comment_id}
*/
const getLike = catchAsync(async (req, res, next) => {
  const { post_id, comment_id } = req.query

  // 檢查 query 參數
  if (!post_id && !comment_id) return next(new AppError(ApiState.FIELD_MISSING))

  if (post_id) getPostLikes(req, res, next)
  if (comment_id) getCommentLikes(req, res, next)
})

/*
  根據 query 給的參數不同，做取得貼文按讚 / 取得留言按讚

  - 切換貼文按讚狀態 PATCH /likes?post_id={post_id}&toggle_type={toggle_type}
  - 切換留言按讚狀態 PATCH /likes?comment_id={comment_id}&toggle_type={toggle_type}
*/

const toggleLike = catchAsync(async (req, res, next) => {
  const { post_id, comment_id, toggle_type } = req.query

  // 檢查 query 參數
  if (!post_id && !comment_id) return next(new AppError(ApiState.FIELD_MISSING))
  if (!toggle_type) return next(new AppError({ statusCode: 400, message: '缺少 toggle_type 參數' }))

  if (post_id) patchPostLikes(req, res, next)
  if (comment_id) patchCommentLikes(req, res, next)
})

module.exports = {
  getLike,
  toggleLike,
}
