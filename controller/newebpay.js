/* eslint-disable camelcase */
const dotenv = require('dotenv')
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState.js')
const payment = require('../utils/payment.js')
// Model
const User = require('../model/user.js')

dotenv.config({ path: './.env' })

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

// 產生訂單資訊
const createPayment = catchAsync(async (req, res, next) => {
  const {
    Amt, Desc, Comment, user_id, login_user_id,
  } = req.body

  if (typeof Amt !== 'number') {
    return next(new AppError({ ...ApiState.DATA_NOT_EXIST, message: 'Amt 必填且要是數字' }))
  }

  // 想抖內的對象
  const user = await User.findById(user_id)
  if (!user) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }

  // 登入者
  const { id } = req.user
  console.log('id', id)
  const currentUser = await User.findById(id).exec()

  const TradeInfo = payment.getTradeInfo({
    Amt,
    Desc: Desc || `給 ${user.name} 的抖內`,
    Comment,
    Email: currentUser.email,
  })

  successHandle({
    res,
    data: {
      ...TradeInfo,
    },
  })
})

// 取得藍新通知
const notify = catchAsync(async (req, res, next) => {
  successHandle({
    res,
    data: {
    },
  })
})

// 取得藍新通知
const returnURL = catchAsync(async (req, res, next) => {
  const URL = `${process.env.FRONTEND_URL}?returnURL`
  res.redirect(URL)
})

module.exports = {
  createPayment,
  notify,
  returnURL,
}
