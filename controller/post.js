// Model
const Post = require('../model/post')
// Utils
const {
  successHandle,
  errorHandle,
} = require('../utils/resHandle')
const { handleBuffer } = require('../utils/index')

// 取得文章列表 API
const getPost = async (req, res) => {
  // TODO: GET : 取得文章列表 API
}

// 新增貼文 API
const createPost = async (req, res) => {
  // TODO: POST : 建立貼文API
}

module.exports = {
  getPost,
  createPost
}