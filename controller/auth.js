// Model
const User = require('../model/user');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/apiState');
const { successHandle } = require('../utils/resHandle.js');

const { checkEmail, checkPassword } = require('../utils/verification');
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

  let memberData = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!memberData.email || !memberData.password) {
    return next(
      new AppError({
        message: '信箱、密碼為必填項目',
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  }

  memberData.password = hashPassword(req.body.password)

  User.findOne({
    email: memberData.email,
    password: memberData.password,
  }).exec((findErr, findRes) => {
    console.log('findErr', findErr);
    console.log('findRes', findRes);
    if (findErr) {
      return next(
        new AppError({
          message: findErr.message,
          statusCode: ApiState.INTERNAL_SERVER_ERROR.statusCode,
        })
      );
    }

    // find 沒找到東西的 res 是 null
    if (findRes === null) {
      return next(
        new AppError({
          message: '帳號密碼錯誤',
          statusCode: ApiState.LOGIN_FAILED.statusCode,
        })
      );
    } 

    const token = jwt.sign(
      // data的內容可以在登入解密出來
      {
        id: findRes._id
      },
      // 給jwt一個字串當作加密編碼參考 需要隱藏起來 否則會有被反推的機會
      // 驗證的時候要用一樣的字串去解 不然會算不出原本的資料
      process.env.SECRET,
      { 
        algorithm: 'HS256', // 加密方式
        // 多久之後到期 60一分鐘到期 60*60一小時
        // 也可以不用exp直接在secret後面加上{ expiresIn: '1h' }
        // exp: Math.floor(Date.now() / 1000) + 60 * 60,
        expiresIn: process.env.EXPIRES_IN
      }
    );

    res.setHeader('token', token);
    return successHandle({
      res,
      message: '登入成功',
      data: {
        user: findRes,
        token: token,
      },
    });
  });
});

/*
  註冊功能	POST	/signup
*/
const signup = catchAsync(async (req, res, next) => {
  
  let memberData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  if (!memberData.name || !memberData.email || !memberData.password) {
    return next(
      new AppError({
        message: '名稱、信箱、密碼為必填項目',
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  }
  if (!checkPassword(req.body.password)) {
    return next(
      new AppError({
        message: '密碼格式錯誤，需包含至少一個英文字與數字，密碼八碼以上',
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  }
  if (!checkEmail(req.body.email)) {
    return next(
      new AppError({
        message: '信箱格式錯誤',
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  }

  User.findOne({ email: memberData.email }, '_id name email').exec(
    (findErr, findRes) => {
      console.log('findErr', findErr)
      console.log('findRes', findRes)
      if (findErr) {
        return next(
          new AppError({
            message: ApiState.INTERNAL_SERVER_ERROR.message,
            statusCode: ApiState.INTERNAL_SERVER_ERROR.statusCode,
          })
        );
      }

      if (findRes !== null) {
        return next(
          new AppError({
            message: '信箱已被使用',
            statusCode: ApiState.DATA_EXIST.statusCode,
          })
        );
      }
    })
  

  memberData.password = hashPassword(req.body.password);
  const createRes = await User.create(memberData)
  console.log('createRes', createRes)
  const data = {
    _id: createRes._id,
    name: createRes.name,
    email: createRes.email,
  };
  return successHandle({ res, message: '註冊成功', data });
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

/*
  驗證token	GET	/check
*/
const checkToken = catchAsync(async (req, res, next) => {
  successHandle({ res, message: 'token驗證成功' });
});

module.exports = {
  login,
  signup,
  logout,
  resetPassword,
  checkToken,
};
