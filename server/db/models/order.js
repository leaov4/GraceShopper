const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['in-cart', 'processing', 'shipped', 'canceled']],
    },
  },
  // price: {
  //   type: Sequelize.DECIMAL(20, 2),
  //   defaultValue: 0,
  // },
})

module.exports = Order
