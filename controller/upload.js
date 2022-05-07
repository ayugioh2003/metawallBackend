/* eslint-disable no-unused-vars */
// Model
const Image = require('../model/image')
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  取得圖片列表 GET /upload/images
*/
const getUpload = catchAsync(async (req, res, next) => {
  const queryStr = req.query

  const queryObj = {
    pageNum: queryStr.n || 1, // 第幾頁
    pageSize: queryStr.s || 0, // 一頁要幾個資料；若沒設定則回傳全部
    sort: queryStr.sort, // 排序 ['oldest', 'latest']
  }

  const data = await Image.find()
    .skip((queryObj.pageNum - 1) * queryObj.pageSize)
    .limit(queryObj.pageSize)
    .sort(queryObj.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 })
  // 回傳資料

  successHandle({ res, data })
})

/*
  上傳圖片 POST /upload/images
*/

const createUpload = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'createUpload' })
})

module.exports = {
  getUpload,
  createUpload,
}
