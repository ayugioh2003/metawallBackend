const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PATCH',
  'Access-Control-Allow-Credentials': true,
}

const successHandle = ({
  res,
  statusCode = 200,
  status = 'success',
  message = '操作成功',
  data = {},
}) => {
  res.writeHead(statusCode, headers)
  res.end(JSON.stringify({
    status,
    message,
    data,
  }))
}

const errorHandle = ({
  res,
  statusCode = 400,
  status = 'failed',
  message = '操作有誤或欄位未填寫正確',
  errors = {},
}) => {
  res.writeHead(statusCode, headers)
  res.end(JSON.stringify({
    status,
    message,
    errors,
  }))
}

module.exports = {
  successHandle,
  errorHandle,
  headers,
}
