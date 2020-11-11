'use strict'

const {reset} = require('nodemon')
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

//PRODUCT DATA
//category
//Flowering Plant
//Succulent
//House Plant

//climate
//Tropical
//Arid
//Cool
//Warm

const productData = [
  {
    name: 'Lily',
    price: 15.0,
    category: 'Flowering Plant',
    climate: 'Cool',
    season: 'Winter',
    description:
      'A genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. Lilies are a group of flowering plants which are important in culture and literature in much of the world.',
    inventory: 20,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326767974-6UG31CD8FBVD689DA8X3/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Ecomm_02_Lily_004.jpg?format=750w',
  },
  {
    name: 'Pencil Plant',
    price: 10.0,
    category: 'Succulent',
    climate: 'Tropical',
    season: 'Summer',
    description: `A tree that grows in semi-arid tropical climates. A hydrocarbon plant, it produces a poisonous latex that can cause blindness.`,
    inventory: 5,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326874145-1RO0GY8KHCQ0Q0QXSD71/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Ecomm_10_Pencil_002.jpg?format=1000w',
  },
  {
    name: 'Alocasia',
    price: 35.0,
    category: 'House Plant',
    climate: 'Tropical',
    season: 'Spring',
    description: `A broad-leaved rhizomatous or tuberous perennial flowering plants from the family Araceae. There are 79 species native to tropical and subtropical Asia to Eastern Australia, and widely cultivated elsewhere`,
    inventory: 23,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326925194-SH58FE5Q44V6AO38THEH/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Ecomm_05_Alocasia_008.jpg?format=1000w',
  },
  {
    name: 'Snake',
    price: 14.0,
    category: 'Flowering Plant',
    climate: 'Arid',
    season: 'Autumn',
    description: `A species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names.`,
    inventory: 23,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326971697-R6LD4Q9Z5V1EU4496JRZ/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Ecomm_17_Snake_001.jpg?format=1000w',
  },
  {
    name: 'Pink Calathea',
    price: 20.0,
    category: 'House Plant',
    climate: 'Cool',
    season: 'Winter',
    description: `A bold and beautiful houseplant, calathea looks good even without flowers. There are lots of varieties of calathea, but one of the most common has luscious, dark green leaves that have scalloped edges and silver brushmarks on the top of the leaves. Underneath, the leaves are a lovely shade of burgundy purple. Each one is a living work of art!`,
    inventory: 23,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327213969-3LILJM6OQFB49I6HBOT8/ke17ZwdGBToddI8pDm48kFcjIIX1FKcdO91v_2sr_2x7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USW_WVzW7aVXo2Ry4s1rbuMMhsaMdDaYTr6tab37c5BbKULy2O2411SvyKR8oCtcyw/Ecomm_03_CalatheaPink_006.jpg?format=750w',
  },
  {
    name: 'Orchid',
    price: 35.0,
    category: 'Flowering Plant',
    climate: 'Warm',
    season: 'Spring',
    description: `A diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant, commonly known as the orchid family. Along with the Asteraceae, they are one of the two largest families of flowering plants.`,
    inventory: 10,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327121147-RG1ANONPMAAXJKDWRODD/ke17ZwdGBToddI8pDm48kFcjIIX1FKcdO91v_2sr_2x7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USW_WVzW7aVXo2Ry4s1rbuMMhsaMdDaYTr6tab37c5BbKULy2O2411SvyKR8oCtcyw/Ecomm_04_Orchid_005.jpg?format=1000w',
  },
  {
    name: 'Maiden Hair',
    price: 11.0,
    category: 'House Plant',
    climate: 'Warm',
    season: 'Spring',
    description: `A genus of about 250 species of ferns in the subfamily Vittarioideae of the family Pteridaceae, though some researchers place it in its own family, Adiantaceae. The genus name comes from Greek, meaning "unwetted", referring to the fronds' ability to shed water without becoming wet.`,
    inventory: 20,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833414098-VOZ0QVGIQDABJ1MZA0I7/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/Ecomm_13_MaidenHair_006.jpg?format=1500w',
  },
  {
    name: 'Cactus',
    price: 18.0,
    category: 'Succulent',
    climate: 'Arid',
    season: 'Summer',
    description: `The word "cactus" derives, through Latin, from the Ancient Greek κάκτος, kaktos, a name originally used by Theophrastus for a spiny plant whose identity is now not certain`,
    inventory: 20,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833454134-T4JCY230M0KFVE694H2T/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/Ecomm_16_Cactus2_005.jpg?format=1500w',
  },
  {
    name: 'Fern',
    price: 10.0,
    category: 'House Plant',
    climate: 'Cool',
    season: 'Winter',
    description: `A fern is a member of a group of vascular plants that reproduce via spores and have neither seeds nor flowers. They differ from mosses by being vascular, i.e., having specialized tissues that conduct water and nutrients and in having life cycles in which the sporophyte is the dominant phase.`,
    inventory: 25,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833595614-2WGCJ5ZPXUOXHFW584GJ/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/Ecomm_07_Fern_003.jpg?format=1500w',
  },
  {
    name: 'Palm',
    price: 13.0,
    category: 'House Plant',
    climate: 'Warm',
    season: 'Autumn',
    description: `Because of their affinity for tropical climates, palms elicit feelings of peace and relaxation like no other plant can. No one ever looked at a palm and thought, "That reminds me to get the taxes done." Palm plants also lend a bold, tropical look to home interiors that is surprisingly easy to pull off. Most palms survive in the same conditions that we find comfortable: warm temperatures, average humidity, and moderate light. Plus, many of these slow-growing palm specimens need only occasional tending to reward you with their elegant green fronds. `,
    inventory: 15,
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833646039-FTYEXWSDNPJG79BCWWQQ/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/Ecomm_18_Palm_004.jpg?format=1500w',
  },
]

const userData = [
  {
    firstName: 'Susan',
    lastName: 'Fernson',
    email: 'the.famous.plant.lady@gmail.com',
    password: 'IlooovePLANTS1234',
  },
  {
    firstName: 'Frank',
    lastName: 'Berries',
    email: 'ferntastic@gmail.com',
    password: 'plants~rocknroll!',
  },
  {
    firstName: 'Guadalupe',
    lastName: 'Saucepan',
    email: 'just.a.chef@gmail.com',
    password: 'IThoughtIWasBuyingFlour',
  },
  {
    firstName: 'Peggy',
    lastName: 'Petunias',
    email: 'smelltheroses@gmail.com',
    password: 'eVeRy1RoSe2hAs3its4Thorns',
  },
  {
    firstName: 'Henri',
    lastName: 'Connifer',
    email: 'pros.and.connifers@gmail.com',
    password: 'username',
  },
  {
    firstName: 'Lee',
    lastName: 'Thetree',
    email: 'leethetree@gmail.com',
    password: 'iL1v3inA***tr33',
  },
  {
    firstName: 'Guy',
    lastName: 'Cacti',
    email: 'cactyes@gmail.com',
    password: 'sp1kyPlantL0ver',
  },
  {
    firstName: 'Maya',
    lastName: 'Mandrake',
    email: 'mandrakesarereal@gmail.com',
    password: 'soil321',
  },
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    userData.map((user) => {
      return User.create(user)
    })
  )

  const products = await Promise.all(
    productData.map((product) => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
