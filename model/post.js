import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    // 發文者名稱
    userName: {
      type: String,
      required: [true, '發文者姓名為必填'],
    },

    // 發文內容
    userContent: {
      type: String,
      required: [true, '內容為必填'],
    },

    // 使用者圖片
    userPhoto: {
      type: String,
    },

    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
      default: new Date().getTime(),
    },

    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { versionKey: false },
)

const Post = mongoose.model('Post', PostSchema)

export default Post
