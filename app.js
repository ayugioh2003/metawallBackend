// Router
import {
  getPostUrl,
  createPostUrl,
} from './router/post.js'
// Controller
import { getPost, createPost } from './controller/post.js'
import { errorHandle, headers } from './utils/resHandle.js'

const app = async (req, res) => {
  if (await getPostUrl(req)) getPost(req, res)
  else if (await createPostUrl(req)) createPost(req, res)
  else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
  } else errorHandle({ res })
}

export default app
