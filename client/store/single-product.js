import axios from 'axios'

//ACTION TYPE
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//ACTION CREATOR
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  }
}

//THUNK
export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    dispatch(setSingleProduct(product))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
const initialState = {
  product: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}
