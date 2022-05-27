// Model
const User = require('../model/user.js')
const ApiState = require('../utils/apiState.js')
const AppError = require('../utils/appError.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const { successHandle } = require('../utils/resHandle.js')
const { login } = require('./auth.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  取得追蹤名單 GET /followings?user_id
  取得追蹤者 GET /followers?user_id
*/
const getFollowList = catchAsync(async (req, res, next) => {
  const followList = await User.find({
    _id: req.user.id,
  }).populate({
    path: 'followings.user',
    select: 'name avatar',
  })

  successHandle({ res, data: followList })
})

/*
  新增追蹤名單 POST /followings
*/
const createFollow = catchAsync(async (req, res, next) => {
  const followId = req.params.follow_id
  if (followId === req.user.id) {
    return next(new AppError({ message: '無法追蹤自己', statusCode: 400 }))
  }

  const checkUser = await User.findById(followId)
  if (!checkUser) return next(new AppError({ message: '查無此用戶ID', statusCode: 400 }))

  const checkFollow = await User.find({
    $and: [
      { _id: req.user.id },
      { 'followings.user': followId },
    ],
  })

  if (checkFollow.length > 0) return next(new AppError({ message: '已追蹤此用戶', statusCode: 400 }))

  const data = await User.updateOne(
    {
      _id: req.user.id,
      'followers.user': { $ne: followId },
    },
    {
      $addToSet: { followings: { user: followId } },
    },
  )
  successHandle({ res, message: '追蹤成功', data })
})

/*
  移除追蹤名單 DELETE /followings
*/
const deleteFollow = catchAsync(async (req, res, next) => {
  const followId = req.params.follow_id
  if (followId === req.user.id) {
    return next(new AppError({ message: '無法取消追蹤自己', statusCode: 400 }))
  }

  const data = await User.updateOne(
    {
      _id: req.user.id,
      'followings.user': followId,
    },
    {
      $pull: {
        followings: { user: followId },
      },
    },
  )
  successHandle({ res, message: '取消追蹤成功', data })
})

module.exports = {
  getFollowList,
  createFollow,
  deleteFollow,
}
