import React from 'react'
import {connect} from 'react-redux'

import {
  fetchCartProductsThunk,
  deleteCartProductThunk,
  increaseQuantityThunk,
  decreaseQuantityThunk,
  updateCartStatusThunk,
} from '../store/cart'
export class Cart extends React.Component {
  componentDidMount() {
    // window.localStorage.setItem('userId', 1) //this probably need to move to the logIn component
    this.props.loadCart()
  }

  handleCheckout() {
    this.props.updateCartStatus(
      this.props.cartProducts[0].order_product.orderId
    )
    this.props.history.push('/checkout')
  }

  render() {
    let cartProducts = this.props.cartProducts
    console.log('cart products ----->', cartProducts)
    let totalPrice = cartProducts.reduce(
      (currentTotal, currentItem) =>
        currentTotal + Number(currentItem.order_product.historicalPrice),
      0
    )
    //historicalPrice from database is return as a str somehow, may need to investigate why

    return (
      <div>
        <h1>Cart</h1>
        <div className="cartProducts">
          {cartProducts[0].id === 0 ? (
            <h3>no products in cart</h3>
          ) : (
            cartProducts.map((item) => (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <h6>{item.name}</h6>
                <h5>${item.order_product.historicalPrice}</h5>
                <div>
                  <button
                    type="button"
                    disabled={item.order_product.quantity < 2}
                    onClick={() => this.props.minusQ(item.order_product)}
                  >
                    -
                  </button>
                  <h6>{item.order_product.quantity}</h6>
                  <button
                    type="button"
                    onClick={() => this.props.plusQ(item.order_product)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => this.props.removeCartItem(item.order_product)}
                >
                  delete
                </button>
              </div>
            ))
          )}
        </div>
        <div className="checkout-bar">
          <button
            type="button"
            onClick={() => {
              this.props.history.push('/products')
            }}
          >
            return
          </button>
          <h2>Total: ${isNaN(totalPrice) ? 0 : totalPrice}</h2>
          <button
            type="button"
            disabled={cartProducts[0].id === 0}
            onClick={() => {
              this.handleCheckout()
            }}
          >
            checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => dispatch(fetchCartProductsThunk()),
    removeCartItem: (order_product) =>
      dispatch(deleteCartProductThunk(order_product)),
    plusQ: (order_product) => dispatch(increaseQuantityThunk(order_product)),
    minusQ: (order_product) => dispatch(decreaseQuantityThunk(order_product)),
    updateCartStatus: (orderId) => dispatch(updateCartStatusThunk(orderId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
