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
              <div className="cart-item" key={item.id}>
                <img className="cart-img" src={item.imageUrl} />
                <div className="cart-name">{item.name}</div>
                <div className="cart-price">
                  ${item.order_product.historicalPrice}
                </div>
                <div className="cart-quantity">
                  <button
                    type="button"
                    className="cart-quantity-minus"
                    disabled={item.order_product.quantity < 2}
                    onClick={() => this.props.minusQ(item.order_product)}
                  >
                    -
                  </button>
                  <div className="cart-quantity-num">
                    {item.order_product.quantity}
                  </div>
                  <button
                    type="button"
                    className="cart-quantity-plus"
                    onClick={() => this.props.plusQ(item.order_product)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="cart-button"
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
            className="cart-button"
            onClick={() => {
              this.props.history.push('/products')
            }}
          >
            return
          </button>
          <h2 className="cart-total">
            Total: ${isNaN(totalPrice) ? 0 : totalPrice}
          </h2>
          <button
            type="button"
            className="cart-button"
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
