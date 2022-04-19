// Model
import Post from '../model/post.js'
// Utils
import {
  successHandle,
  errorHandle,
} from '../utils/resHandle.js'
import { handleBuffer } from '../utils/index.js'

// 取得文章列表 API
const getPost = async (req, res) => {
  // TODO: GET : 取得文章列表 API
  successHandle({ res })
}

// 新增貼文 API
const createPost = async (req, res) => {
  // TODO: POST : 建立貼文API
  successHandle({ res, message: '新增成功' })
}

export {
  getPost,
  createPost
}