// Model
const Post = require('../model/post.js')
const User = require('../model/user.js')
const ApiState = require('../utils/apiState.js')
const AppError = require('../utils/appError.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const { successHandle } = require('../utils/resHandle.js')

// 取得文章列表 API
/*
  取得貼文列表 GET /posts?user_id
  取得用戶按讚貼文 GET /posts?like_user_id
  */
const getPost = catchAsync(async (req, res, next) => {
  const query = req.query;

  const timeSort = query.sort == 'oldest' ? 'createdAt' : '-createdAt';
  const q = query.q ? {content: new RegExp(query.q)} : {};
  const userId = query.user_id ? {user: query.user_id} : {};

  // 檢查 ObjectId 型別是否有誤
  if (query.user_id && !query.user_id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError({
        message: '使用者ID格式錯誤',
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  };

  const data = await Post.find({...userId, ...q}).populate({
    path: 'user',
    select: 'id name avatar comments like_users_id'
  }).sort(timeSort);

  successHandle({ res, message: '取得貼文列表成功', data });
})

// 新增貼文 API
const createPost = catchAsync(async (req, res, next) => {
  const {
    user, content, image, otherData,
  } = req.body;

  const data = await Post.create({
    user, content, image, ...otherData,
  })

  successHandle({ res, message: '新增成功', data })
})

// 取得單一貼文 PATCH /posts/:post_id
const getSinglePost = catchAsync(async (req, res, next) => {
  // TODO: 取得單一貼文 API
  successHandle({ res, message: 'getSinglePost' })
})

// 修改單一貼文 PATCH /posts/:post_id
const updateSinglePost = catchAsync(async (req, res, next) => {
  // TODO: 修改單一貼文 API
  successHandle({ res, message: 'updateSinglePost' })
})

// 刪除單一貼文 DELETE /posts/:post_id
const deleteSinglePost = catchAsync(async (req, res, next) => {
  // TODO: 刪除單一貼文 API
  successHandle({ res, message: 'deleteSinglePost' })
})

module.exports = {
  getPost,
  createPost,
  getSinglePost,
  updateSinglePost,
  deleteSinglePost,
}
