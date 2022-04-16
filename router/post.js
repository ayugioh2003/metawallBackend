const {
  getMethod,
  postMethod,
} = require('../utils/httpMethod')

const getPostUrl = async (req) => {
  return req.url === '/posts' && getMethod(req)
}

const createPostUrl = async (req) => {
  return req.url === '/posts' && postMethod(req)
}

module.exports = {
  getPostUrl,
  createPostUrl,
}