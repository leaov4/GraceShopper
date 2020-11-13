const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    console.log('--->router prod id: ', req.params.productId)
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      price,
      inventory,
      category,
      climate,
      season,
      description,
      imageUrl,
    } = req.body
    const newProduct = await Product.create({
      name,
      price,
      inventory,
      category,
      climate,
      season,
      description,
      imageUrl,
    })
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const {
      name,
      price,
      inventory,
      category,
      climate,
      season,
      description,
      imageUrl,
    } = req.body
    const updatedProductInfo = await Product.update(
      {
        name,
        price,
        inventory,
        category,
        climate,
        season,
        description,
        imageUrl,
      },
      {
        returning: true,
        where: {
          id: req.params.productId,
        },
      }
    )

    if (updatedProductInfo.length !== 2) {
      res.sendStatus(404)
    }

    const [numUpdated, [updatedProduct]] = updatedProductInfo
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
