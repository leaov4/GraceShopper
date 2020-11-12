import axios from 'axios'

const RECEIVE_CART_PRODUCTS = 'RECEIVE_CART_PRODUCTS'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

//ACTION CREATOR
export const receiveCartProducts = (cartProducts) => {
  return {
    type: RECEIVE_CART_PRODUCTS,
    cartProducts,
  }
}

export const changeQuantity = (productInCart) => {
  return {
    type: CHANGE_QUANTITY,
    productInCart,
  }
}

export const deleteCartProduct = (productId) => {
  return {
    type: DELETE_CART_PRODUCT,
    productId,
  }
}

//THUNK
export const fetchCartProductsThunk = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/cart') //route might be different
      dispatch(receiveCartProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeQuantityThunk = (productId, product) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart/${productId}`, product) //route might be different
      dispatch(changeQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteCartProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${productId}`) //route might be different
      dispatch(deleteCartProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CART_PRODUCTS:
      return action.cartProducts // not sure how it is called yet
    case CHANGE_QUANTITY:
      return [
        ...state, // not sure how to put the quan change in here yet
      ]
    case DELETE_CART_PRODUCT: {
      const remainingProducts = state.filter(
        (product) => product.id !== action.productId // need to double check all attributes' name
      )
      return remainingProducts
    }

    default:
      return state
  }
}

export default cartReducer
