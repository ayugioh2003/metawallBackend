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
  // 可以先用這個 post_id 查查: 62936fa267318abadb12f354
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
    })
  if (!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }
  successHandle({ res, message: 'getComment', data: post.comments })
})

/**
  新增留言	POST	/comments
  @bodyParam {string} post_id 貼文的ID
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
  console.log(post)
  const newComment = await Comment.create({
    content,
    user: userId,
    post: post_id,
  })
  successHandle({ res, message: 'createComment', data: newComment })
})

/**
  修改留言	PATCH	/comments/:comment_id
  @bodyParam {string} post_id 貼文的ID
  @bodyParam {string} content 修改的內文
*/
const updateComment = catchAsync(async (req, res, next) => {
  let { content, post_id } = req.body
  const commentId = req.params.comment_id
  const userId = req?.user?.id
  // 必填欄位
  content = content?.trim()
  if(!content || !post_id) {
    return next(new AppError(ApiState.FIELD_MISSING))
  }
  if(!userId) {
    return next(new AppError(ApiState.PERMISSION_DENIED))
  }
  if(!commentId) {
    return next(new AppError({ message: '未填入留言 ID', statusCode: 400 }))
  }
  // 檢查貼文是否存在
  const post = await Post.findById(post_id)
  if(!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }
  // 更新
  const newComment = await Comment.findOneAndUpdate(
    { _id: commentId, post: post_id, user: userId },
    { content },
    { new: true }
  )

  successHandle({ res, message: 'updateComment', data: newComment })
})

/**
  刪除留言	DELETE	/comments/:comment_id
  @bodyParam {string} post_id 貼文的ID
*/
const deleteComment = catchAsync(async (req, res, next) => {
  let { post_id } = req.body
  const commentId = req.params.comment_id
  const userId = req?.user?.id
  // 必填欄位
  if(!post_id) {
    return next(new AppError(ApiState.FIELD_MISSING))
  }
  if(!userId) {
    return next(new AppError(ApiState.PERMISSION_DENIED))
  }
  if(!commentId) {
    return next(new AppError({ message: '未填入留言 ID', statusCode: 400 }))
  }
  // 檢查貼文是否存在
  const post = await Post.findById(post_id)
  if(!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }

  // 刪除
  const data = await Comment.findOneAndDelete({ _id: commentId, post: post_id, user: userId })
  if(!data) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({ res, message: 'deleteComment' })
})

module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment,
}
