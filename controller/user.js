// Model
const User = require('../model/user.js')
// Utils
const catchAsync = require('../utils/catchAsync.js')
const AppError = require('../utils/appError.js')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState.js')
const { checkPassword } = require('./auth.js')
const { hashPassword } = require('../utils/hash.js')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/* 取得目前資訊GET/users/current-userinfo */
const getCurrentUserInfo = catchAsync(async (req, res, next) => {
  const user = req?.user
  const userInfo = await User.findById(user?.id)
    .populate({
      path: 'messages',
      select: '_id content createdAt',
    })
  return successHandle({ res, ...ApiState.SUCCESS, data: userInfo })
})

/* 修改個人資訊PATCH/users/current-userinfo */
const updateCurrentUserInfo = catchAsync(async (req, res, next) => {
  const user = req?.user
  let { name, avatar, gender } = req.body
  name = name?.trim()
  avatar = avatar?.trim()
  const editData = {}
  // 暱稱必填
  if (name !== undefined && (!name || name?.length < 2)) {
    return next(new AppError({
      statusCode: ApiState.FIELD_MISSING.statusCode,
      status: ApiState.FIELD_MISSING.status,
      message: '暱稱為必填，且至少為兩字元',
    }))
  }
  if (name !== undefined) {
    editData.name = name
  }
  // 性別
  if (gender !== undefined) {
    const sex = ['male', 'female']
    if (!sex.some((item) => item === gender)) {
      return next(new AppError({
        statusCode: ApiState.FIELD_MISSING.statusCode,
        status: ApiState.FIELD_MISSING.status,
        message: `不接受 ${gender}，僅接受 male, female`,
      }))
    }
    editData.gender = gender
  }
  // 頭像
  if (avatar !== undefined) {
    editData.avatar = avatar
  }
  const editUser = await User.findByIdAndUpdate(user?.id, editData, { returnDocument: 'after', runValidators: true })
  if (!editUser) {
    return next(new AppError(ApiState.UPDATE_FAILED))
  }
  successHandle({ res, message: '修改個人資訊成功', data: editUser })
})

/* 取得個人資訊 GET/users/:user_id */
const getUserInfo = catchAsync(async (req, res, next) => {
  const userId = req.params.user_id
  const user = await User.findById(userId)
    .select('_id name avatar').populate({
      path: 'messages',
      select: '_id content createdAt',
    })
  if (!user) {
    return next(new AppError(ApiState.DATA_NOT_EXIST))
  }
  return successHandle({ res, ...ApiState.SUCCESS, data: user })
})

/* 取得用戶列表GET/users */
const getUserList = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .populate({
      path: 'messages',
      select: '_id content createdAt',
    })
  if (!users) {
    return next(new AppError(ApiState.FAIL))
  }
  return successHandle({ res, ...ApiState.SUCCESS, data: users })
})

/* 新增個人資訊 POST /users/:user_id */
const createUserInfo = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '成功' })
})

/* 刪除個人資訊 DELETE /users/:user_id */
const deleteUserInfo = catchAsync(async (req, res, next) => {
  // successHandle({ res, message: '成功' })
})

/* 修改個人資訊 PATCH /users/:user_id */
const updateUserInfo = catchAsync(async (req, res, next) => {
  const userId = req.params?.user_id
  let { name, avatar, gender } = req.body
  name = name?.trim()
  avatar = avatar?.trim()
  const editData = {}
  if (!userId) {
    return next(new AppError(ApiState.ROUTER_NOT_FOUND))
  }
  // 暱稱必填
  if (name !== undefined && (!name || name?.toString()?.length < 2)) {
    return next(new AppError({
      statusCode: ApiState.FIELD_MISSING.statusCode,
      status: ApiState.FIELD_MISSING.status,
      message: '暱稱為必填，且至少為兩字元',
    }))
  }
  if (name !== undefined) {
    editData.name = name
  }
  // 性別
  if (gender !== undefined) {
    const sex = ['male', 'female']
    if (!sex.some((item) => item === gender)) {
      return next(new AppError({
        statusCode: ApiState.FIELD_MISSING.statusCode,
        status: ApiState.FIELD_MISSING.status,
        message: `不接受 ${gender}，僅接受 male, female`,
      }))
    }
    editData.gender = gender
  }
  // 頭像
  if (avatar !== undefined) {
    editData.avatar = avatar
  }
  const editUser = await User.findByIdAndUpdate(userId, editData, { returnDocument: 'after', runValidators: true })
  if (!editUser) {
    return next(new AppError(ApiState.FAIL))
  }
  successHandle({ res, message: ApiState.SUCCESS, data: editUser })
})

/*
  修改密碼 PATCH /reset-password
*/
const resetPassword = catchAsync(async (req, res, next) => {
  const { user } = req
  const { password, confirmPassword } = req.body
  if (!password || !confirmPassword) {
    return next(
      new AppError({
        statusCode: ApiState.FIELD_MISSING.statusCode,
        status: ApiState.FIELD_MISSING.status,
        message: '新密碼及再次確認新密碼為必填項目',
      }),
    )
  }
  if (!checkPassword(req.body.password)) {
    return next(
      new AppError({
        statusCode: ApiState.FIELD_MISSING.statusCode,
        status: ApiState.FIELD_MISSING.status,
        message: '密碼格式錯誤，需包含至少一個英文字與數字，密碼八碼以上',
      }),
    )
  }
  if (password !== confirmPassword) {
    return next(
      new AppError({
        statusCode: ApiState.FAIL.statusCode,
        status: ApiState.FAIL.status,
        message: '新密碼及再次確認新密碼不一致',
      }),
    )
  }
  const newPassword = hashPassword(password)
  const editUser = await User.findByIdAndUpdate(user?.id, { password: newPassword }, { returnDocument: 'after', runValidators: true })
  if (!editUser) {
    return next(
      new AppError(ApiState.UPDATE_FAILED),
    )
  }
  successHandle({ res, message: '修改密碼成功', data: editUser })
})

module.exports = {
  getUserInfo,
  getCurrentUserInfo,
  updateCurrentUserInfo,
  getUserList,
  createUserInfo,
  deleteUserInfo,
  updateUserInfo,
  resetPassword,
}
