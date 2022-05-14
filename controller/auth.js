// Model
const User = require('../model/user');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { successHandle } = require('../utils/resHandle.js');
const { verifyToken, checkEmail } = require('../utils/verification');
const { hashPassword } = require('../utils/hash');
// jwt
const jwt = require('jsonwebtoken');

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  登入功能	POST	/login
*/
const login = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登入成功' });
});

/*
  註冊功能	POST	/signup
*/
const signup = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '註冊成功' });
});

/*
  登出功能	GET	/logout
*/
const logout = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '登出成功' });
});

/*
  修改密碼	PATCH	/reset-password
*/
const resetPassword = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const token = req.headers.token;

  const verify = await verifyToken(token);
  // 驗證要修改的帳號是不是登入的帳號
  if (verify && verify === id) {
    // 測試資料全部都寫  如果沒填就用前端取得的舊會員資料
    const memberData = {
      id: verify,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
    };

    if (checkEmail(memberData.email)) {
      User.findByIdAndUpdate({ _id: memberData.id }, memberData, {
        new: true,
      }).exec((updateErr, updateRes) => {
        if (updateErr) {
          return next(
            new AppError(
              ApiState.DATA_NOT_EXIST.message,
              ApiState.DATA_NOT_EXIST.statusCode
            )
          );
        }
        return successHandle({ res, message: '更新成功', data: updateRes });
      });
    } else {
      return next(
        new AppError(
          ApiState.DATA_NOT_EXIST.message,
          ApiState.DATA_NOT_EXIST.statusCode
        )
      );
    }
  }
  // 如果不是現在登入的帳號
  else {
    return next(
      new AppError(
        ApiState.DATA_NOT_EXIST.message,
        ApiState.DATA_NOT_EXIST.statusCode
      )
    );
  }
});

module.exports = {
  login,
  signup,
  logout,
  resetPassword,
};
