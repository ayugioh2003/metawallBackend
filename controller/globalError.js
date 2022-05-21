const ApiState = require('../utils/apiState.js')

// DB 欄位驗證
const handleValidationErrorDB = (err) => {
  if (err && Object.keys(err.errors).length > 0) {
    err.customError = {}
    Object.keys(err.errors).forEach((item) => {
      err.customError[item] = err.errors[item].message
    })
  }
  setError(ApiState.FIELD_MISSING, err)
}

const sendErrorDev = (err, res) => {
  // console 顯示錯誤訊息
  console.log(err.stack)
  console.log('err.statusCode', err.statusCode)

  // Dev 環境會特別顯示 Error 印出詳細錯誤訊息
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.customError || err.errors,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.customError,
  })
}

const isDev = () => (process.env.NODE_ENV === 'development')
const isProduction = () => (process.env.NODE_ENV === 'production')
const setError = (customError, err) => {
  err.message = customError.message
  err.status = customError.status
  err.statusCode = customError.statusCode
}

// 捕捉到錯誤
module.exports = (err, req, res, next) => {
  const customeMessage = ApiState.INTERNAL_SERVER_ERROR

  err.statusCode = err.statusCode ?? customeMessage.statusCode
  err.status = err.status ?? customeMessage.status
  err.name = err.name
  err.stack = err.stack
  console.log('err.status', err.status)

  if (err instanceof SyntaxError) setError(ApiState.SYNTAX_ERROR, err)
  if (err instanceof ReferenceError) setError(ApiState.REFERENCE_ERROR, err)
  if (err instanceof TypeError) setError(ApiState.TYPE_ERROR, err)
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err)
  if (err?.kind === 'ObjectId') setError(ApiState.DATA_NOT_EXIST, err)
  else {
    err.message = isDev
      ? err.message
      : customeMessage.message
  }

  // Dev 環境給詳細 Log
  isDev() && sendErrorDev(err, res)

  // Production 環境給簡易 Log
  isProduction() && sendErrorProd(err, res)
}
