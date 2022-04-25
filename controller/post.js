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
    keyword: queryStr.q || '', // 要搜尋的關鍵字
    pageNum: queryStr.n || 1, // 第幾頁
    pageSize: queryStr.s || 0, // 一頁要幾個資料；若沒設定則回傳全部
    sort: queryStr.sort, // 排序 ['oldest', 'latest']
  }
  // 這邊暫定針對貼文內容去做搜尋與排序
  const data = await Post.find({ userContent: { $regex: queryObj.keyword } })
    .skip((queryObj.pageNum - 1) * queryObj.pageSize)
    .limit(queryObj.pageSize)
    .sort((queryObj.sort === 'oldest') ? { createdAt: 1 } : { createdAt: -1 })
  successHandle({ res, data })
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

export { getPost, createPost }
