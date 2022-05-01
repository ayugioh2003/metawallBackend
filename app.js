/* eslint-disable import/order */
const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

// Utils
const corsOptions = require('./utils/cors.js')
// Router
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const postRouter = require('./router/post.js')
const userRouter = require('./router/user.js')
const authRouter = require('./router/auth.js')
const commentRouter = require('./router/comment.js')
const likeRouter = require('./router/like.js')
const followingRouter = require('./router/following.js')
const paymentRouter = require('./router/payment.js')
const orderRouter = require('./router/order.js')
const uploadRouter = require('./router/upload.js')

// Controller
const globalErrorHandler = require('./controller/globalError.js')
const AppError = require('./utils/appError.js')
const ApiState = require('./utils/apiState.js')

// Swagger
const swaggerPath = path.resolve(__dirname, './swagger.yml')
const swaggerDocument = YAML.load(swaggerPath)
const cssOptions = require('./utils/swagger.js')

// API Document
app.use(
  '/apidoc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, cssOptions),
)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

// Router
app.use('/', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/likes', likeRouter)
app.use('/followings', followingRouter)
app.use('/payment', paymentRouter)
app.use('/orders', orderRouter)
app.use('/upload', uploadRouter)

// 無此路由
app.use('*', (req, res, next) => {
  next(new AppError(ApiState.ROUTER_NOT_FOUND))
})

// 全域處理錯誤
app.use(globalErrorHandler)

module.exports = app
