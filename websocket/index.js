/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
const WebSocket = require('ws')

const wsServer = (expressServer) => {
  const wsUser = []

  // 建立新的ws伺服器
  const websocketServer = new WebSocket.Server({
    server: expressServer,
  })

  websocketServer.on(
    'connection',
    async (websocketConnection, connectionRequest) => {
      const [_path, params] = connectionRequest?.url?.split('?')
      console.log(_path)
      console.log(params)
      console.log(`目前連線人數 : ${websocketServer._server._connections}`)
      websocketConnection.userid = params

      wsUser.push({ userid: params, ws: websocketConnection })

      websocketConnection.on('message', async (message) => {
        const msgData = JSON.parse(message)

        wsUser.forEach((item) => {
          item.ws.send(JSON.stringify(msgData))
        })
      })
    },
  )

  return websocketServer
}

module.exports = wsServer
