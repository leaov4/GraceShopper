import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const deleteProduct = id => ({type: DELETE_PRODUCT, id})

const addProduct = product => ({type: ADD_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

//ONLY FOR ADMIN
export const destroyProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(deleteProduct(id))
  } catch (err) {
    console.error(err)
  }
}

//ONLY FOR ADMIN
export const createProduct = product => async dispatch => {
  console.log(product)
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return [...state].filter(product => !product.includes(action.id))
    case ADD_PRODUCT:
      return [...state].concat(action.product)
    default:
      return state
  }
}
