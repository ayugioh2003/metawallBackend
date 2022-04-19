import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// 遠端資料庫
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

// 連接本地資料庫
const localDB = process.env.DATABASE_LOCAL

const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

export default connectDB