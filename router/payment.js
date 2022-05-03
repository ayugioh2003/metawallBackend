const express = require('express')

const router = express.Router()
const paymentController = require('../controller/payment.js')

router
  .route('/create_payment')
  .post(paymentController.createPayment) // 取得付款資訊

module.exports = router
