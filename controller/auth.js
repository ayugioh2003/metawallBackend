// Model
const User = require('../model/user');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/ApiState');
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
  const memberData = {
    email: req.body.email,
    password: hashPassword(req.body.password),
  };

  User.findOne({
    email: memberData.email,
    password: memberData.password,
  }).exec((err, findRes) => {
    if (err) {
      return next(
        new AppError({
          message: ApiState.INTERNAL_SERVER_ERROR.message,
          statusCode: ApiState.INTERNAL_SERVER_ERROR.statusCode,
        })
      );
    }

    // find 沒找到東西的 res 是 null
    if (findRes === null) {
      return next(
        new AppError({
          message: ApiState.LOGIN_FAILED.message,
          statusCode: ApiState.LOGIN_FAILED.statusCode,
        })
      );
    } else {
      const token = jwt.sign(
        {
          // 加密方式
          algorithm: 'HS256',
          // 多久之後到期 60一分鐘到期 60*60一小時 也可以不用exp直接在secret後面加上{ expiresIn: '1h' }
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          // data的內容可以在登入解密出來
          data: findRes._id,
        },
        // 給jwt一個字串當作加密編碼參考 需要隱藏起來 否則會有被反推的機會
        // 驗證的時候要用一樣的字串去解 不然會算不出原本的資料
        'secret'
      );

      res.setHeader('token', token);
      findRes.token = token;

      return successHandle({
        res,
        message: '登入成功',
        data: {
          user: findRes,
          token: findRes.token,
        },
      });
    }
  });
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
  successHandle({ res, message: '修改密碼成功' });
});

module.exports = {
  login,
  signup,
  logout,
  resetPassword,
};
