const router = require('express').Router()
const {Order_Product} = require('../db/models')
module.exports = router

// POST /api/orders_products
router.post('/', async (req, res, next) => {
  try {
    const {quantity, orderId, productId, historicalPrice} = req.body
    const newOrder_Product = await Order_Product.create({
      quantity,
      orderId,
      productId,
      historicalPrice,
    })
    res.json(newOrder_Product)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/orders_products/:orders_productsId
router.delete('/:order_productId', async (req, res, next) => {
  try {
    await Order_Product.destroy({
      where: {
        id: req.params.orders_productsId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/orders_products/:orders_productsId
router.put('/:order_productId', async (req, res, next) => {
  try {
    const {quantity, orderId, productId, historicalPrice} = req.body
    const updatedOrderProductInfo = await Order_Product.update(
      {quantity, orderId, productId, historicalPrice},
      {
        returning: true,
        where: {
          id: req.params.order_productId,
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
