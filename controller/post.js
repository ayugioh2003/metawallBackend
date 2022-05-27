/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
// Model
const { query } = require('express')
const Post = require('../model/post.js')
const User = require('../model/user.js')
// Utils
const catchAsync = require('../utils/catchAsync.js')
const ApiState = require('../utils/apiState.js')
const AppError = require('../utils/appError.js')
const { checkObjectId } = require('../utils/verification.js')
const { successHandle } = require('../utils/resHandle.js')

// 取得用戶按讚貼文 [GET] /posts?like_user_id={user_id}
const getUserLike = catchAsync(async (req, res, next) => {
  const { like_user_id } = req.query

  // 檢查 ObjectId 型別是否有誤
  if (like_user_id && !checkObjectId(like_user_id)) {
    return next(new AppError({ message: 'ID 格式錯誤', statusCode: 400 }))
  }

  const myLikeList = await Post
    .find({
      likes: { $in: [like_user_id] },
    })
    .populate({
      path: 'user',
      select: '_id name email',
    })

  // 檢查資料是否存在
  if (!myLikeList) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({
    res,
    data: myLikeList,
  })
})

// 取得貼文列表 [GET] /posts?user_id={user_id}
const getPostList = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const { query } = req

  // 檢查 ObjectId 型別是否有誤
  if (query.user_id && !checkObjectId(query.user_id)) {
    return next(new AppError({ message: 'ID格式錯誤', statusCode: 400 }))
  }

  const timeSort = query.sort === 'oldest' ? 'createdAt' : '-createdAt'
  const q = query.q ? { content: new RegExp(query.q) } : {}
  const userId = query.user_id ? { user: query.user_id } : {}
  const data = await Post.find({ ...userId, ...q }).populate({
    path: 'user',
    select: '_id name avatar',
  }).sort(timeSort)

  successHandle({ res, message: '取得貼文列表成功', data })
})

/*
  根據 query 給的參數不同，做取得貼文按讚 / 取得留言按讚

  - 取得貼文列表 [GET] /posts?user_id={user_id}
  - 取得用戶按讚貼文 [GET] /posts?like_user_id={like_user_id}
*/
const getPost = catchAsync(async (req, res, next) => {
  const { like_user_id } = req.query

  // 若提供 like_user_id 參數，則執行 [取得用戶按讚貼文]
  // 若無提供任何參數，執行 [取得貼文列表]
  if (like_user_id) getUserLike(req, res, next)
  else getPostList(req, res, next)
})

// 新增貼文 API
const createPost = catchAsync(async (req, res, next) => {
  const {
    content, image, comments,
  } = req.body

  if (!content) return next(new AppError(ApiState.FIELD_MISSING))

  const data = await Post.create({
    user: req.user._id,
    content,
    image,
    comments,
  })

  successHandle({ res, message: '新增成功', data })
})

// 取得單一貼文 API
const getSinglePost = catchAsync(async (req, res, next) => {
  const postId = req.params.post_id

  // 檢查 ObjectId 型別是否有誤
  if (!checkObjectId(postId)) {
    return next(new AppError({ message: 'ID格式錯誤', statusCode: 400 }))
  }

  const data = await Post.findById(postId).populate({
    path: 'user',
    select: '_id name avatar',
  }).exec()

  if (!data) return next(new AppError({ message: '查無貼文資料', statusCode: 400 }))

  successHandle({ res, message: '取得單一貼文成功', data })
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

// 刪除所有貼文 DELETE /posts
const deleteAllPost = catchAsync(async (req, res, next) => {
  await Post.deleteMany()
  successHandle({ res, message: '刪除所有貼文成功' })
})

// 取得當前登入使用者點過讚的全部貼文 [GET] /posts/likes
const getCurrentUserLikesList = catchAsync(async (req, res, next) => {
  const likeList = await Post
    .find({
      likes: { $in: [req.user.id] },
    })
    .populate({
      path: 'user',
      select: '_id name email',
    })

  // 檢查資料是否存在
  if (!likeList) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({
    res,
    data: likeList,
  })
})

module.exports = {
  getPost,
  createPost,
  getSinglePost,
  updateSinglePost,
  deleteSinglePost,
  deleteAllPost,
  getCurrentUserLikesList,
}
