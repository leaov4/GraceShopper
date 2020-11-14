import React from 'react'
import {connect} from 'react-redux'

import {fetchCartProductsThunk, deleteCartProductThunk} from '../store/cart'
export class Cart extends React.Component {
  // constructor(props) {
  //   super(props)
  //   // this.state = {  }
  // }

  componentDidMount() {
    window.localStorage.setItem('userId', 1) //this probably need to move to the logIn component
    this.props.loadCart()
  }

  render() {
    let cartProducts = this.props.cartProducts
    console.log(cartProducts)

    return (
      <div>
        <h1>Cart</h1>
        <div className="cartProducts">
          {cartProducts.map((item) => (
            <div key={item.id}>
              <img src={item.imageUrl} />
              <h6>{item.name}</h6>
              <h5>{item.price}</h5>
              <div>
                <button type="button">-</button>
                <h6>{item.order_product.quantity}</h6>
                <button type="button">+</button>
              </div>
              <button
                type="button"
                onClick={() => this.props.removeCartItem(item.order_product)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <div className="checkout-bar">
          <button
            type="button"
            onClick={() => {
              history.goBack()
            }}
          >
            return
          </button>
          <h2>Total: $80</h2>
          <button type="button">checkout</button>
          {/* might change the checkout button to link */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => dispatch(fetchCartProductsThunk()),
    removeCartItem: (order_product) =>
      dispatch(deleteCartProductThunk(order_product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
