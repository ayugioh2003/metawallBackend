/* eslint-disable no-unused-vars */
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
  取得訂單列表 GET /orders
  取得使用者訂單列表 GET /orders?user_id
*/
const getOrder = catchAsync(async (req, res, next) => {
  // TODO: 根據有給 query，做取得訂單列表 / 取得 User 訂單
  successHandle({ res, message: 'getOrder' })
})

/*
  建立訂單 POST /orders
*/

const createOrder = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'createOrder' })
})


/*
  取得訂單 GET /orders/:order_id
*/
const getSingleOrder = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'getSingleOrder' })
})

/*
  編輯訂單 PATCH /orders/:order_id
*/
const updateSingleOrder = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'updateSingleOrder' })
})

/*
  取消訂單 DELETE /orders/:order_id
*/
const deleteOrder = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'deleteOrder' })
})

module.exports = {
  getOrder,
  createOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteOrder
}
