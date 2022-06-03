const express = require('express')
const { isAuth } = require('../controller/auth.js')

const router = express.Router()
const newebpayController = require('../controller/newebpay.js')

router
  .route('/create-payment')
  .post(isAuth, newebpayController.createPayment) // 產生訂單資訊

router
  .route('/return-url')
  .get(newebpayController.returnURL)
  .post(newebpayController.returnURL)

module.exports = router
