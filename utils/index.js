/**
 * 取得 URL ID
 * @date 2022-04-16
 * @param {String} {url}
 * @returns {String}
 */
const filterUrlId = ({ url }) => {
  return [...url.split('/')].pop()
}

/**
 * 請求 Body 處理
 * @date 2022-04-16
 * @param {Object} req
 * @returns {Object} 將請求 body內容轉為物件
 */
const handleBuffer = async (req) => {
  try {
    const buffers = []

    for await (const chunk of req) {
      buffers.push(chunk)
    }
    return JSON.parse(Buffer.concat(buffers).toString())

  } catch (error) {
    throw error
  }
}

export {
  filterUrlId,
  handleBuffer
}