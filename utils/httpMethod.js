/**
 * 判斷 HTTP 方法
 * @date 2022-04-16
 * @param {String} {method}
 * @returns {Boolean} true/false
 */
const getMethod = ({ method }) => method === 'GET'
const postMethod = ({ method }) => method === 'POST'
const deleteMethod = ({ method }) => method === 'DELETE'
const patchMethod = ({ method }) => method === 'PATCH'
const optionsMethod = ({ method }) => method === 'OPTIONS'

export {
  deleteMethod,
  getMethod,
  postMethod,
  patchMethod,
  optionsMethod,
}
