const { connect } = require('http2')
const mongoose = require('mongoose')
require('dotenv').config()

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

module.exports = connect