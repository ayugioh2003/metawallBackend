const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Order Model
 * 訂單模組
*/
const OrderSchema = new mongoose.Schema({

})

const Order = mongoose.model(OrderSchema)
module.exports = Order