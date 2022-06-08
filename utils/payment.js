const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const {
  BACKEND_URL, FRONTEND_URL, MERCHANT_ID: MerchantID, HASH_KEY: HashKey, HASH_IV: HashIV,
} = process.env

const PayGateWay = 'https://ccore.newebpay.com/MPG/mpg_gateway' // 藍新 form post 網址
// const ReturnURL = `${FRONTEND_URL}/?from=returnURL`
const ReturnURL = `${BACKEND_URL}/api/newebpay/return-url` // 交易成功的轉址
const NotifyURL = `${BACKEND_URL}/api/notifyURL` // 交易成功後呼叫的 API
// const ReturnURL = URL + '/newebpay/callback?from=ReturnURL'
// const ClientBackURL = URL + '/orders'
const ClientBackURL = `${FRONTEND_URL}/?from=clientBackURL` // 失敗或取消的轉址
let data

function genDataChain(TradeInfo) {
  const results = []
  Object.entries(TradeInfo).forEach((kv) => {
    results.push(`${kv[0]}=${kv[1]}`)
  })
  return results.join('&')
}

function encryptTradeInfoAES(TradeInfo) {
  const encrypt = crypto.createCipheriv('aes256', HashKey, HashIV)
  const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex')
  return enc + encrypt.final('hex')
}

function hashTradeInfoSHA(TradeInfo) {
  const sha = crypto.createHash('sha256')
  const plainText = `HashKey=${HashKey}&${TradeInfo}&HashIV=${HashIV}`

  return sha.update(plainText).digest('hex').toUpperCase()
}

module.exports = {
  getTradeInfo: ({
    Amt, Desc, Comment, Email, OrderId = null, user_id,
  }) => {
    const now = String(Date.now())
    data = {
      MerchantID,
      RespondType: 'JSON',
      Version: 1.5,
      TimeStamp: OrderId || now,
      MerchantOrderNo: OrderId || now,
      Amt,
      ItemDesc: Desc,
      Email,
      //
      LoginType: 0,
      ReturnURL: `${ReturnURL}?orderid=${OrderId || now}`,
      NotifyURL,
      ClientBackURL,
      OrderComment: Comment || 'OrderComment',
      LangType: 'zh-tw',
    }

    const mpgAesEncrypt = encryptTradeInfoAES(data)
    const mpgShaEncrypt = hashTradeInfoSHA(mpgAesEncrypt)

    const tradeInfo = {
      MerchantID,
      TradeInfo: mpgAesEncrypt,
      TradeSha: mpgShaEncrypt,
      Version: 1.5,
      PayGateWay,
      MerchantOrderNo: data.MerchantOrderNo,
    }

    return tradeInfo
  },
  decryptTradeInfo: (TradeInfo) => {
    const decrypt = crypto.createDecipheriv('aes256', HashKey, HashIV)
    decrypt.setAutoPadding(false)
    const text = decrypt.update(TradeInfo, 'hex', 'utf8')
    const plainText = text + decrypt.final('utf8')
    // eslint-disable-next-line no-control-regex
    const result = plainText.replace(/[\x00-\x20]+/g, '')
    return result
  },
}
