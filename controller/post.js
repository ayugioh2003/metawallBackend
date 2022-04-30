// Model
const Post = require('../model/post.js')
// Utils
const { successHandle, errorHandle } = require('../utils/resHandle.js')

// 取得文章列表 API
const getPost = async (req, res) => {
  const queryStr = req.query

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
    const {
      userName, userContent, userPhoto, otherData,
    } = req.body

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

module.exports = {
  getPost,
  createPost
}
