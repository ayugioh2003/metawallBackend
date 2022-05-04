// Model
const User = require('../model/user');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const apiState = require('../utils/apiState');
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
  try {
    const memberData = {
      email: req.body.email,
      password: hashPassword(req.body.password),
    };
    User.findOne({
      email: memberData.email,
      password: memberData.password,
    }).exec((err, findRes) => {
      if (err) {
        return successHandle({
          res,
          status: false,
          statusCode: 404,
          message: '登入失敗',
          data: new AppError(apiState.INTERNAL_SERVER_ERROR).message,
        });
      }
      if (findRes === null) {
        return successHandle({
          res,
          status: false,
          statusCode: 404,
          message: '登入失敗',
          data: new AppError(apiState.DATA_NOT_EXIST).message,
        });
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
            user:findRes,
            token:findRes.token
          },
        });
      }
    });
  } catch (error) {
    return successHandle({
      res,
      status: false,
      statusCode: 404,
      message: '登入失敗',
      data: new AppError(apiState.SYNTAX_ERROR).message,
    });
  }
});

/*
  註冊功能	POST	/signup
*/
const signup = catchAsync(async (req, res, next) => {
  try {
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
    };
    if (checkEmail(req.body.email)) {
      User.findOne({ email: memberData.email }).exec((err, res) => {
        if (err) {
          return successHandle({
            res,
            status: false,
            statusCode: 404,
            message: '註冊失敗',
            data: new AppError(apiState.INTERNAL_SERVER_ERROR).message,
          });
        }
      });
      try {
        const data = await User.create(memberData);
        return successHandle({ res, message: '註冊成功', data });
      } catch (error) {
        return successHandle({
          res,
          status: false,
          statusCode: 404,
          message: '註冊失敗',
          data: new AppError(apiState.DATA_EXIST).message,
        });
      }
    } else {
      return successHandle({
        res,
        status: false,
        statusCode: 404,
        message: '註冊失敗',
        data: new AppError(apiState.FIELD_MISSING).message,
      });
    }
  } catch (error) {
    return successHandle({
      res,
      status: false,
      statusCode: 404,
      message: '註冊失敗',
      data: new AppError(apiState.SYNTAX_ERROR).message,
    });
  }
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
