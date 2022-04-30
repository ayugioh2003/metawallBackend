const express = require('express')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
// Router
const postRouter = require('./router/post.js')
const userRouter = require('./router/user.js')
const authRouter = require('./router/auth.js')
// Controller
const globalErrorHandler = require('./controller/globalError.js')
const AppError = require('./utils/appError.js')
const ApiState = require('./utils/apiState.js')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Router
app.use('/', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)

// 無此路由
app.use('*', (req, res, next) => {
  next(new AppError(ApiState.ROUTER_NOT_FOUND))
})

// 全域處理錯誤
app.use(globalErrorHandler)

module.exports = app
