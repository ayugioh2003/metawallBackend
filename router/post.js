import {
  getMethod,
  postMethod,
} from '../utils/httpMethod.js'

const getPostUrl = async (req) => {
  return req.url === '/posts' && getMethod(req)
}

const createPostUrl = async (req) => {
  return req.url === '/posts' && postMethod(req)
}

export {
  getPostUrl,
  createPostUrl,
}