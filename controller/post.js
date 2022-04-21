import url from 'url'
import querystring from 'querystring'
/* eslint-disable no-unused-vars */
// Model
import Post from '../model/post.js'
// Utils
import { successHandle, errorHandle } from '../utils/resHandle.js'
import { handleBuffer } from '../utils/index.js'
// 取得文章列表 API
const getPost = async (req, res) => {
  // TODO: GET : 取得文章列表 API
  const urlParser = url.parse(req.url).query
  const queryStr = querystring.parse(urlParser)
  const queryObj = {
    name: queryStr.q || '',
    pageNum: queryStr.n || 1,
    pageSize: queryStr.s || 0,
    sort: queryStr.sort,
  }
  // 這邊暫定針對名字去做搜尋與排序
  const data = await Post.find(queryObj.name === '' ? {} : { userName: queryObj.name })
    .skip((queryObj.pageNum - 1) * queryObj.pageSize)
    .limit(queryObj.pageSize)
    .sort((queryObj.sort === 'oldest') ? { userName: -1 } : { userName: 1 })
  successHandle({ res, data })
}

// 新增貼文 API
const createPost = async (req, res) => {
  // TODO: POST : 建立貼文API
  successHandle({ res, message: '新增成功' })
}

export { getPost, createPost }
