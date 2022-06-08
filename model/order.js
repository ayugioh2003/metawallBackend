const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Order Model
 * 訂單模組
*/
const OrderSchema = new mongoose.Schema({
  // 使用者ID
  MerchantOrderNo: {
    type: Number,
    required: [true, '商店訂單編號為必填'],
  },
  // 商品名稱
  ItemDesc: {
    type: String,
    required: [true, '商品名稱為必填'],
  },
  // 商店備註
  Comment: {
    type: String,
  },
  Amt: {
    type: Number,
    required: [true, '商品金額為必填'],
  },
  donateFrom: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, '付錢老大的ID為必填'],
  },
  donateTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, '收到錢錢的ID為必填'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Date.now(),
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
