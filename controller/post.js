/* eslint-disable no-unused-vars */
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
  try {
    const postData = await handleBuffer(req)
    const {
      userName, userContent, userPhoto, otherData,
    } = postData
    const data = await Post.create({
      userName, userContent, userPhoto, ...otherData,
    })

    successHandle({ res, message: '新增成功', data })
  } catch (error) {
    // eslint-disable-next-line no-prototype-builtins
    const hasErrorsKey = Object.prototype.hasOwnProperty.call(error, 'errors')

    errorHandle({ res, errors: hasErrorsKey ? error.errors : error.message })
  }
}

export {
  getPost,
  createPost,
}
