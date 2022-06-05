/* eslint-disable no-console */
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState.js')
// Model
const Message = require('../model/message.js')

// 取得訊息列表
const getMessages = catchAsync(async (req, res, next) => {
  const message = await Message.find().populate({
    path: 'user',
  })
  if (!message) return next(new AppError(ApiState.DATA_NOT_EXIST))
  console.log(message)
  successHandle({
    res,
    data: {
      message,
    },
  })
})

module.exports = { getMessages }
