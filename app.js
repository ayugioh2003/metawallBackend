// Router
const {
  getPostUrl,
  createPostUrl,
} = require('./router/index')
// Controller
const { getPost, createPost } = require('./controller/post')

const app = async (req, res) => {

  if (await getPostUrl(req)) getPost(req, res)
  else if (await createPostUrl(req)) createPost(req, res)
  else errorHandle({ res })
}

module.exports = app