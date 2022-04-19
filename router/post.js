import {
  getMethod,
  postMethod,
} from '../utils/httpMethod.js'

const getPostUrl = async (req) => req.url === '/posts' && getMethod(req)

const createPostUrl = async (req) => req.url === '/posts' && postMethod(req)

export {
  getPostUrl,
  createPostUrl,
}
