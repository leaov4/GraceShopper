const router = require('express').Router()
const {Order_Product, Order, Product} = require('../db/models')
module.exports = router

// POST /api/orders_products
// this is to add an item from singleProduct component to the cart; cart-item's price will be written in the historicalPrice attribute
router.post('/', async (req, res, next) => {
  try {
    const {productId, price} = req.body

    const cart = await Order.findOne({
      where: {
        userId: req.user.dataValues.id, //this is the userId from passport middlewear
        orderStatus: 'in-cart',
      },
    })

    const newOrder_Product = await Order_Product.create({
      quantity: 1,
      orderId: cart.id,
      productId,
      historicalPrice: price,
    })

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/orders_products/
// this is to delete item in the cart
//* might need to add gatekeeping middleware
router.delete('/', async (req, res, next) => {
  try {
    const {orderId, productId} = req.body
    await Order_Product.destroy({
      where: {
        orderId: orderId,
        productId: productId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/orders_products/
// this is to change the quantity in the cart
//* might need to add gatekeeping middleware
router.put('/', async (req, res, next) => {
  try {
    const {quantity, orderId, productId} = req.body
    const updatedOrderProductInfo = await Order_Product.update(
      {quantity},
      {
        returning: true,
        where: {
          orderId,
          productId,
        },
      }
    )

    if (updatedOrderProductInfo.length !== 2) {
      res.sendStatus(404)
    }
    const [numUpdated, [updatedOrderProduct]] = updatedOrderProductInfo
    res.json(updatedOrderProduct)
  } catch (error) {
    next(error)
  }
})
