const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
// Router
const postRouter = require('./router/post.js')
const userRouter = require('./router/user.js')
const authRouter = require('./router/auth.js')
const commentRouter = require('./router/comment.js')
// Controller
const globalErrorHandler = require('./controller/globalError.js')
const AppError = require('./utils/appError.js')
const ApiState = require('./utils/apiState.js')

// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yml')
const cssOptions = require('./utils/swagger')

// API Document
app.use(
  '/apidoc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, cssOptions)
);

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Router
app.use('/', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)

// 無此路由
app.use('*', (req, res, next) => {
  next(new AppError(ApiState.ROUTER_NOT_FOUND))
})

// 全域處理錯誤
app.use(globalErrorHandler)

module.exports = app
