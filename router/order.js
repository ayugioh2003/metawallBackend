const express = require('express')

const router = express.Router()
const orderController = require('../controller/order.js')

router
  .route('/')
  .get(orderController.getOrder) // 取得訂單列表、取得訂單
  .post(orderController.createOrder) // 建立訂單

router
  .route('/:order_id')
  .get(orderController.getSingleOrder) // 取得訂單
  .patch(orderController.updateSingleOrder) // 編輯訂單
  .delete(orderController.deleteOrder) // 取消訂單

module.exports = router
