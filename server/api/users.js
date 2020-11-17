const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  console.log('here', req.user.admin)
  try {
    if (!req.user.admin) {
      const err = new Error(`You aren't admin, this is not allowed.`)
      err.status = 401
      return next(err)
    }
    next()
  } catch (err) {
    console.log(err)
  }
}

// GET /api/users
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET /api/users/admin
//ADMIN GET REQUEST, ONLY ADMINS GET ALL USER DATA
router.get('/admin', async (req, res, next) => {
  try {
    console.log('req.user.admin', req.user.admin)
    if (!req.user.admin) {
      const err = new Error(`You aren't admin, this is not allowed.`)
      err.status = 401
      return next(err)
    } else {
      const users = await User.findAll()
      res.json(users)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.query.email,
      },
    })
    console.log('--->router user', user)
    if (user) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
