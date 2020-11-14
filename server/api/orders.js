const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// GET /api/orders/cart
// this is to return a cart of products that belongs to one user in cart component
router.get('/cart', async (req, res, next) => {
  try {
    const orders = await Order.findOne(
      {include: [{model: Product}]},
      {
        where: {
          userId: req.body, //this is the userId from localStorage
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
// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         id: req.params.orderId,
//       },
//       include: Order_Product,
//     })
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

// POST /api/orders
// this is for creating initial cart at sign up and checkout
router.post('/', async (req, res, next) => {
  try {
    const {userId} = req.body
    const newOrder = await Order.create({orderStatus: 'in-cart', userId})
    res.json(newOrder)
    //! newOrder contains orderId, we need to use localStorage to store orderId when it is created
  } catch (error) {
    next(error)
  }
})

//DELETE /api/orders/:orderId
// router.delete('/:orderId', async (req, res, next) => {
//   try {
//     await Order.destroy({
//       where: {
//         id: req.params.orderId,
//       },
//     })
//     res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// })

// PUT /api/orders/:orderId
// this is used to update orderStatus when checkout
router.put('/:orderId', async (req, res, next) => {
  try {
    // const {orderStatus, userId} = req.body
    const updatedOrderInfo = await Order.update(
      {orderStatus: 'processing'}, //currently it will only change from 'in-cart' to 'processing'
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
