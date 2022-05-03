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
  取得付款資訊 POST /payment/create_payment
*/
const createPayment = catchAsync(async (req, res, next) => {
  // TODO: 取得付款資訊 訂單
  successHandle({ res, message: 'createPayment' })
})


module.exports = {
  createPayment,
}
