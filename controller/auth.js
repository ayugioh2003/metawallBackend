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
            user: findRes,
            token: findRes.token,
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
  res.removeHeader('token');
  successHandle({ res, message: '登出成功' });
});

/*
  修改密碼	PATCH	/reset-password
*/
const resetPassword = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const token = req.headers.token;

  //   如果沒token直接跳去下面catch
  try {
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
            return successHandle({
              res,
              status: false,
              statusCode: 404,
              message: '更新失敗 無此會員',
              data: new AppError(apiState.DATA_NOT_EXIST).message,
            });
          }
          return successHandle({ res, message: '更新成功', data: updateRes });
        });
        // User.findOne({ email: memberData.email }).exec((findErr, findRes) => {
        //   if (findErr) {
        //     return successHandle({
        //       res,
        //       status: false,
        //       statusCode: 404,
        //       message: '更新失敗',
        //       data: new AppError(apiState.INTERNAL_SERVER_ERROR).message,
        //     });
        //   }
        //   if (findRes === null) {
        //     User.updateOne({ _id: memberData.id }, memberData, {
        //       new: true,
        //     }).exec((updateErr, updateRes) => {
        //       if (updateErr) {
        //         return successHandle({
        //           res,
        //           status: false,
        //           statusCode: 404,
        //           message: '更新失敗 無此會員',
        //           data: new AppError(apiState.DATA_NOT_EXIST).message,
        //         });
        //       }
        //       return successHandle({ res, message: '更新成功', data: updateRes });
        //     });
        //   }
        // });
      } else {
        return successHandle({
          res,
          status: false,
          statusCode: 404,
          message: '更新失敗 信箱格式錯誤',
          data: new AppError(apiState.FIELD_MISSING).message,
        });
      }
    }
    // 如果不是現在登入的帳號
    else {
      return successHandle({
        res,
        status: false,
        statusCode: 404,
        message: '更新失敗 帳號登入錯誤',
        data: new AppError(apiState.DATA_NOT_EXIST).message,
      });
    }
  } catch (error) {
    return successHandle({
      res,
      status: false,
      statusCode: 404,
      message: '更新失敗 token錯誤 請重新登入',
      data: new AppError(apiState.DATA_NOT_EXIST).message,
    });
  }
});

module.exports = {
  login,
  signup,
  logout,
  resetPassword,
};
