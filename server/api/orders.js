const router = require('express').Router()
const {Order, Order_Product, Product} = require('../db/models')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findOne(
      {include: [{model: Product}]},
      {
        where: {
          userId: req.body, //hardcoded at this moment
          orderStatus: 'in-cart',
        },
      }
    )
    res.json(orders.products)
  } catch (error) {
    next(error)
  }
})

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      },
      include: Order_Product,
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// POST /api/orders
router.post('/', async (req, res, next) => {
  try {
    const {orderStatus, userId} = req.body
    const newOrder = await Order.create({orderStatus, userId})
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/orders/:orderId
router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/orders/:orderId
router.put('/:orderId', async (req, res, next) => {
  try {
    const {orderStatus, userId} = req.body
    const updatedOrderInfo = await Order.update(
      {orderStatus, userId},
      {
        returning: true,
        where: {
          id: req.params.orderId,
        },
      }
    )

    if (updatedOrderInfo.length !== 2) {
      res.sendStatus(404)
    }
    const [numUpdated, [updatedOrder]] = updatedOrderInfo
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
