const http = require('http')
const app = require('./app')
const connectDB = require('./db')

const PORT = process.env.PORT || 3005

// 連接資料庫
connectDB()

// 啟動 Server
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`)
})