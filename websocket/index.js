/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
const WebSocket = require('ws')
const Message = require('../model/message.js')

const wsServer = (expressServer) => {
  // 存連線進來的使用者資訊
  const wsUser = []
  const realtimeWs = []
  // 建立新的ws伺服器
  const websocketServer = new WebSocket.Server({
    // server: expressServer,
    noServer: true,
  })
  // 即時訊息
  const realtimePost = new WebSocket.Server({
    // Server: expressServer,
    noServer: true,
  })
  websocketServer.on(
    'connection',
    async (websocketConnection, connectionRequest) => {
      const [_path, params] = connectionRequest?.url?.split('?')
      const user = params.split('=')[1]
      console.log(_path)
      // console.log(`目前連線人數 : ${websocketServer._server._connections}`)
      websocketConnection.userid = user

      wsUser.push({ userid: user, ws: websocketConnection })
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
  // 即時訊息
  realtimePost.on(
    'connection',
    async (websocketConnection, connectionRequest) => {
      const [_path, params] = connectionRequest?.url?.split('?')
      const user = params.split('=')[1]

      console.log(_path)
      realtimeWs.push({ userid: user, ws: websocketConnection })
      websocketConnection.on('message', async (message) => {
        const msgData = JSON.parse(message)

        realtimeWs.forEach((item) => {
          item.ws.send(JSON.stringify(msgData))
        })
      })
    },
  )

  // 路由
  expressServer.on('upgrade', (request, socket, head) => {
    const [_path, params] = request?.url?.split('?')
    if (_path === '/') {
      websocketServer.handleUpgrade(request, socket, head, (ws) => {
        websocketServer.emit('connection', ws, request)
      })
    } else if (_path === '/realtimepost') {
      realtimePost.handleUpgrade(request, socket, head, (ws) => {
        realtimePost.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  return websocketServer
}

module.exports = wsServer
