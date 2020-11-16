import axios from 'axios'

const RECEIVE_CART_PRODUCTS = 'RECEIVE_CART_PRODUCTS'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'
const UPDATE_STATUS_NEW_CART = 'UPDATE_STATUS_NEW_CART'

//ACTION CREATOR
export const receiveCartProducts = (cartProducts) => {
  return {
    type: RECEIVE_CART_PRODUCTS,
    cartProducts,
  }
}

export const increaseQuantity = (order_product) => {
  return {
    type: INCREASE_QUANTITY,
    order_product,
  }
}

export const decreaseQuantity = (order_product) => {
  return {
    type: DECREASE_QUANTITY,
    order_product,
  }
}

export const deleteCartProduct = (productId) => {
  return {
    type: DELETE_CART_PRODUCT,
    productId,
  }
}

export const updateStatusCreateNewCart = (newCart) => {
  return {
    type: UPDATE_STATUS_NEW_CART,
    newCart,
  }
}

//THUNK
export const fetchCartProductsThunk = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/orders/cart')
      dispatch(receiveCartProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const increaseQuantityThunk = (order_product) => {
  return async (dispatch) => {
    try {
      order_product.quantity += 1
      const {data} = await axios.put(`/api/orders_products/`, order_product)
      dispatch(increaseQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const decreaseQuantityThunk = (order_product) => {
  return async (dispatch) => {
    try {
      order_product.quantity -= 1
      const {data} = await axios.put(`/api/orders_products/`, order_product)
      dispatch(decreaseQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteCartProductThunk = (order_product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/orders_products`, {
        data: {
          orderId: order_product.orderId,
          productId: order_product.productId,
        },
      })
      dispatch(deleteCartProduct(order_product.productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartStatusThunk = (orderId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/orders/${orderId}`)
      const {data} = await axios.post(`/api/orders`)
      dispatch(updateStatusCreateNewCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// REDUCER
const initialState = [
  {
    id: 0,
    imageUrl: '',
    name: '',
    price: 0,
    order_product: {},
  },
]

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CART_PRODUCTS:
      return action.cartProducts.length ? action.cartProducts : initialState

    case INCREASE_QUANTITY: {
      let updatedProducts = [...state]
      let pIdx = updatedProducts.findIndex(
        (item) => item.id === action.order_product.productId
      )
      updatedProducts[pIdx].order_product = action.order_product
      return updatedProducts
    }
    case DECREASE_QUANTITY: {
      let updatedProducts = [...state]
      let pIdx = updatedProducts.findIndex(
        (item) => item.id === action.order_product.productId
      )
      updatedProducts[pIdx].order_product = action.order_product
      return updatedProducts
    }
    case DELETE_CART_PRODUCT: {
      const remainingProducts = state.filter(
        (item) => item.id !== action.productId
      )
      return remainingProducts.length ? remainingProducts : initialState
    }
    case UPDATE_STATUS_NEW_CART: {
      return initialState
    }
    default:
      return state
  }
}

export default cartReducer
