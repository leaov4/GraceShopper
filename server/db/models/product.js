const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(20, 2),
    allowNull: false,
    validate: {
      min: 0.99,
      max: 99.0,
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 99,
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Flowering Plant', 'Succulent', 'House Plant']],
    },
  },
  climate: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Tropical', 'Arid', 'Cool', 'Warm']],
    },
  },
  season: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Winter', 'Summer', 'Autumn', 'Spring']],
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000],
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326808447-VJTRPOSP00LMXL9596OA/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/Texture_09_012.jpg',
    validate: {
      isUrl: true,
    },
  },
})

module.exports = Product
