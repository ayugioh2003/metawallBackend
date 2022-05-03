/* eslint-disable no-unused-vars */
// Model
// const Image = require('../model/image')
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
  // TODO: 根據有給 query，做取得訂單列表 / 取得 User 訂單
  successHandle({ res, message: 'getUpload' })
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
