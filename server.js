/* eslint-disable no-console */
const app = require('./app.js')
const connectDB = require('./db.js')

const PORT = process.env.PORT || 3005

// 連接資料庫
connectDB()

// 啟動 Server
app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`)
})
