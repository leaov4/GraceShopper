const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Product = require('./product')

const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  historicalPrice: {
    type: Sequelize.DECIMAL(20, 2),
    allowNull: false,
  },
})

module.exports = Order_Product
