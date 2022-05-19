// Model
const Comment = require('../model/comment');
const User = require('../model/user');
const Post = require('../model/post');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { successHandle } = require('../utils/resHandle.js');
const ApiState = require('../utils/apiState');

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/


/**
  取得貼文留言	GET	/comments?post_id
  // 可以先用這個 post_id 查查: 62851f947b754253e29aa062
*/
const getComment = catchAsync(async (req, res, next) => {
  const {post_id, sort, limit} = req.query;
  const post = await Post.findById(post_id);
  if(!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST));
  }
  const comments = await Comment.find({post: post_id});
  if(!comments) {
    return next(new AppError(ApiState.FAIL));
  }
  successHandle({ res, message: 'getComment', data: comments, });
})

/**
  新增留言	POST	/comments
  @bodyParam {string} post_id  post的ID
  @bodyParam {string} content comment的內文
*/
const createComment = catchAsync(async (req, res, next) => {
  let { post_id, content } = req.body;
  // TODO: user_id先寫死
  const userId   = req?.user?.id || '62859b708528e159a6ec9fc7';
  // 必填未填
  content = content?.trim();
  if(!post_id || !content){
    return next(new AppError(ApiState.FIELD_MISSING));
  }
  // 檢查用戶是否存在
  const user = await User.findById(userId);
  if(!user) {
    return next(new AppError(ApiState.DATA_NOT_EXIST));
  }
  // 檢查貼文是否存在
  const post = await Post.findById(post_id);
  if(!post) {
    return next(new AppError(ApiState.DATA_NOT_EXIST));
  }
  const comment = await Comment.create({
    user: userId,
    post: post_id,
    content,
  });
  if(!comment){
    return next(new AppError(ApiState.FAIL));
  }
  successHandle({ res, message: 'createComment', data: comment });
})

/**
  修改留言	PATCH	/comments
  @bodyParam {string} user_id  user的ID
  @bodyParam {string} id      comment的ID
  @bodyParam {string} content comment的內文
*/
const updateComment = catchAsync(async (req, res, next) => {
  // 分別為 commentId, commnet內文, userId
  let { id, user_id, content } = req.body;
  // TODO: user_id先寫死
  const userId = req?.user?.id || '62859b708528e159a6ec9fc7';
  // 必填未填
  if(!id || !content || !content.trim()){
    return next(new AppError(ApiState.FIELD_MISSING));
  }
  // 非本人, 權限不足
  if(user_id !== userId) { 
    return next(new AppError(ApiState.PERMISSION_DENIED));
  }
  const editComment = await Comment.findByIdAndUpdate(id, {content});
  if(!editComment) {
    return next(new AppError(ApiState.UPDATE_FAILED));
  }
  successHandle({ res, message: ApiState.SUCCESS})
})

/**
  刪除留言	DELETE	/comments
  @bodyParam {string} id       comment的ID
  @bodyParam {string} user_id  user的ID
*/
const deleteComment = catchAsync(async (req, res, next) => {
  const { id, user_id } = req.body;
  // TODO: user_id先寫死
  const userId = req?.user?.id || '62859b708528e159a6ec9fc7';
  if(!id) {
    return next(new AppError(ApiState.FIELD_MISSING));
  }
  // 檢查是不是本人
  if(user_id !== userId){
    return next(new AppError(ApiState.PERMISSION_DENIED));
  }
  const deleteComment = await Comment.findByIdAndDelete(id);
  if(!deleteComment) {
    return next(new AppError(ApiState.FAIL));
  }
  successHandle({ res, message: 'deleteComment' })
})

module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment
}