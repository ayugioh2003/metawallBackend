/* eslint-disable */
const mongoose = require('mongoose')

// 遠端資料庫
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
)

// 連接本地資料庫，這裡留著是方便本地開發切換使用，故不刪除
const localDB = process.env.DATABASE_LOCAL

const connectDB = async () => {
  try {
    await mongoose.connect(DB || localDB)
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

module.exports = connectDB
