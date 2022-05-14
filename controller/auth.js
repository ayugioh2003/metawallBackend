// Model
const User = require('../model/user')
// Utils
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { successHandle } = require('../utils/resHandle.js')
const { verifyToken, checkEmail } = require('../utils/verification');
const { hashPassword } = require('../utils/hash');

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/


/*
  登入功能	POST	/login
*/
const login = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登入成功' })
})

/*
  註冊功能	POST	/signup
*/
const signup = catchAsync(async (req, res, next) => {
console.log(req.body);
  const memberData = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword(req.body.password),
  };

  if (checkEmail(req.body.email)) {
    User.findOne({ email: memberData.email }).exec((err, res) => {
      if (err) {
        return next(new AppError(ApiState.INTERNAL_SERVER_ERROR.message, ApiState.INTERNAL_SERVER_ERROR.statusCode));
      }
    });
    try {
      const data = await User.create(memberData);
      return successHandle({ res, message: '註冊成功', data });
    } catch (error) {
      // 帳號已存在
      return next(new AppError(ApiState.DATA_EXIST.message, ApiState.DATA_EXIST.statusCode));
    }
  } else {
    return next(new AppError(ApiState.FIELD_MISSING.message, ApiState.FIELD_MISSING.statusCode));
  }
})

/*
  登出功能	GET	/logout
*/
const logout = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登出成功' })
})

/*
  修改密碼	PATCH	/reset-password
*/
const resetPassword = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '修改密碼成功' })
})

module.exports = {
  login,
  signup,
  logout,
  resetPassword
}