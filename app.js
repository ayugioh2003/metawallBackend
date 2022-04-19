// Router
const { getPostUrl, createPostUrl } = require('./router/post');
// Controller
const { getPost, createPost } = require('./controller/post');
const { errorHandle } = require('./utils/resHandle');

const app = async (req, res) => {
  if (await getPostUrl(req)) getPost(req, res);
  else if (await createPostUrl(req)) createPost(req, res);
  else {
    errorHandle({ res });
  }
};

module.exports = app;
