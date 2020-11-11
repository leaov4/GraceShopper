const Sequelize = require('sequelize')
const db = require('../db')

const Cart_Product = db.define('cart_product', {
  quantity: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Cart_Product
