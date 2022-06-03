/* eslint-disable no-console */
const dotenv = require('dotenv')
const { createServer } = require('http')

const app = require('./app.js')

dotenv.config({ path: './.env' })
const connectDB = require('./db.js')

// ws模組
const websockets = require('./websocket/index.js')

const server = createServer(app)
const PORT = process.env.PORT || 3005

// 連接資料庫
connectDB()

// 啟動 Server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
  console.log(`Swagger API Url http://localhost:${PORT}/apidoc`)
})

// 啟動ws伺服器
websockets(server)
