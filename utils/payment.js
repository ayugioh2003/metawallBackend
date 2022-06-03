const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const {
  BACKEND_URL, FRONTEND_URL, MERCHANT_ID: MerchantID, HASH_KEY: HashKey, HASH_IV: HashIV,
} = process.env

const PayGateWay = 'https://ccore.newebpay.com/MPG/mpg_gateway'
// const ReturnURL = `${FRONTEND_URL}/?from=returnURL`
const ReturnURL = `${BACKEND_URL}/api/newebpay/return-url`
const NotifyURL = `${BACKEND_URL}/api/notifyURL`
// const ReturnURL = URL + '/newebpay/callback?from=ReturnURL'
// const ClientBackURL = URL + '/orders'
const ClientBackURL = `${FRONTEND_URL}/?from=clientBackURL`
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
    Amt, Desc, Comment, Email, OrderId = null,
  }) => {
    data = {
      MerchantID,
      RespondType: 'JSON',
      Version: 1.5,
      TimeStamp: OrderId || Date.now(),
      MerchantOrderNo: OrderId || Date.now(),
      Amt,
      ItemDesc: Desc,
      Email,
      //
      LoginType: 0,
      ReturnURL,
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
