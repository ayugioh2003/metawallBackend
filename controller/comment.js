// Model
const Comment = require('../model/comment')
const User = require('../model/user')
const Post = require('../model/post')
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

/**
  取得貼文留言	GET	/comments/:post_id
  // 可以先用這個 post_id 查查: 628bbfd84713ea5374dbbc8c
*/
const getComment = catchAsync(async (req, res, next) => {
  const postId = req.params.post_id
  const userId = req.user?.id
  if (!userId) {
    return next(new AppError(ApiState.PERMISSION_DENIED))
  }
  // 找到貼文
  const post = await Post.findById(postId)
    .populate({
      path: 'comments',
      select: 'content user',
    })
  if (!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }
  successHandle({ res, message: 'getComment', data: post.comments })
})

/**
  新增留言	POST	/comments
  @bodyParam {string} post_id  貼文的ID
  @bodyParam {string} content comment的內文
*/
const createComment = catchAsync(async (req, res, next) => {
  let { content, post_id } = req.body
  const userId = req?.user?.id
  // 必填未填
  content = content?.trim()
  if (!content || !post_id) {
    return next(new AppError(ApiState.FIELD_MISSING))
  }
  if (!userId) {
    return next(new AppError(ApiState.PERMISSION_DENIED))
  }
  // 檢查貼文是否存在
  const post = await Post.findById(post_id)
  if (!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }
  const newComment = await Comment.create({
    content,
    user: userId,
    post: post_id,
  })
  successHandle({ res, message: 'createComment', data: newComment })
})

/**
  修改留言	PATCH	/comments
*/
const updateComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: ApiState.SUCCESS })
})

/**
  刪除留言	DELETE	/comments
*/
const deleteComment = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'deleteComment' })
})

module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment,
}
