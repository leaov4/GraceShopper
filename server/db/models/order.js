const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['processing', 'shipped', 'canceled']],
    },
  },
})

module.exports = Order
