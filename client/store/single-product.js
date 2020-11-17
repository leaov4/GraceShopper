import axios from 'axios'

//ACTION TYPE
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

//ACTION CREATOR
export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const updatedProduct = newProduct => {
  return {
    type: UPDATED_PRODUCT,
    newProduct
  }
}

//THUNK
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    dispatch(setSingleProduct(product))
  } catch (err) {
    console.log('There was an error fetching single product.')
    console.error(err)
  }
}

export const updateProduct = (product, productId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${productId}`, product)
    dispatch(updatedProduct(data))
  } catch (err) {
    console.log('There was an error updating product.')
  }
}

//REDUCER
const initialState = {
  product: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    case UPDATED_PRODUCT:
      return {...state, product: action.newProduct}
    default:
      return state
  }
}
