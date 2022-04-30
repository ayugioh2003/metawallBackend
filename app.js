const express = require('express')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
// Router
const postRouter = require('./router/post.js')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Router
app.use('/posts', postRouter)

// 無此路由
// app.use('*', (req, res, next) => {

// })

// 處理錯誤
// app.use(globalErrorHandler)

module.exports = app
