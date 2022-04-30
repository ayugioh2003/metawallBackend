const successHandle = ({
  res,
  statusCode = 200,
  status = 'success',
  message = '操作成功',
  data = {},
}) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  })
}

module.exports = {
  successHandle,
}
