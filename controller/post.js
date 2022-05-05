// Model
const Post = require('../model/post.js')
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
const getPost = catchAsync(async (req, res) => {
  // TODO: 需多新增 取得用戶按讚貼文 GET /posts?like_user_id
  const queryStr = req.query

  const queryObj = {
    keyword: queryStr.q || '', // 要搜尋的關鍵字
    pageNum: queryStr.n || 1, // 第幾頁
    pageSize: queryStr.s || 0, // 一頁要幾個資料；若沒設定則回傳全部
    sort: queryStr.sort, // 排序 ['oldest', 'latest']
  }
  // 這邊暫定針對貼文內容去做搜尋與排序
  const data = await Post.find({ userContent: { $regex: queryObj.keyword } })
    .skip((queryObj.pageNum - 1) * queryObj.pageSize)
    .limit(queryObj.pageSize)
    .sort((queryObj.sort === 'oldest') ? { createdAt: 1 } : { createdAt: -1 })

  successHandle({ res, data })
})

// 新增貼文 API
const createPost = catchAsync(async (req, res, next) => {
  const {
    userName, userContent, userPhoto, otherData,
  } = req.body

  const data = await Post.create({
    userName, userContent, userPhoto, ...otherData,
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
