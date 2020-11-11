import axios from 'axios'

//ACTION TYPE
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//ACTION CREATOR
export const setSingleProduct = (product) => {
  console.log('in single product')
  console.log('--->ac product: ', product)
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  }
}

//THUNK
export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    console.log('--->got product id: ', productId)
    const {data: product} = await axios.get(`/api/products/${productId}`)
    console.log('--->product: ', product)
    dispatch(setSingleProduct(product))
  } catch (err) {
    console.log('Error fetching single product.')
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
      console.log('--->reducer product: ', action.product)
      return {...state, product: action.product}
    default:
      console.log('*******hit default')
      return state
  }
}
