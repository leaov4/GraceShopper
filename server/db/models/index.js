const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const Order_Product = require('./order_product')
const Cart_Product = require('./cart_product')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.belongsTo(Order)
Order.hasMany(User)

Order.belongsTo(Order_Product)
Order_Product.hasMany(Order)

Product.belongsTo(Order_Product)
Order_Product.hasMany(Product)

User.belongsTo(Cart)
Cart.hasMany(User)

Cart.belongsTo(Cart_Product)
Cart_Product.hasMany(Cart)

Product.belongsTo(Cart_Product)
Cart_Product.hasMany(Product)

module.exports = {
  User,
  Product,
  Cart,
  Order,
  Order_Product,
  Cart_Product,
}
