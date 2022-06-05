/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
const WebSocket = require('ws')
const Message = require('../model/message.js')

const catchAsync = require('../utils/catchAsync.js')

const wsServer = (expressServer) => {
  // 存連線進來的使用者資訊
  const wsUser = []

  // 建立新的ws伺服器
  const websocketServer = new WebSocket.Server({
    server: expressServer,
  })

  websocketServer.on(
    'connection',
    async (websocketConnection, connectionRequest) => {
      const [_path, params] = connectionRequest?.url?.split('?')
      const user = params.split('=')[1]
      console.log(_path)
      console.log(`目前連線人數 : ${websocketServer._server._connections}`)
      websocketConnection.userid = user

      wsUser.push({ userid: params, ws: websocketConnection })

      websocketConnection.on('message', async (message) => {
        const msgData = JSON.parse(message)
        // 訊息加入資料庫
        const result = await Message.create({
          content: msgData.content,
          type: msgData.type,
          user: msgData.user._id,
        })
        wsUser.forEach((item) => {
          item.ws.send(JSON.stringify(msgData))
        })
      })
    },
  )

  return websocketServer
}

module.exports = wsServer
