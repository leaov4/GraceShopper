import React from 'react'
import {connect} from 'react-redux'

import {
  fetchCartProductsThunk,
  changeQuantityThunk,
  deleteCartProductThunk,
} from '../store/cart'
export class Cart extends React.Component {
  // constructor(props) {
  //   super(props)
  //   // this.state = {  }
  // }

  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        <div className="product">
          Image, Name, Price
          <button type="button">-</button>
          <h6>1</h6>
          <button type="button">+</button>
          <button
            type="button"
            onClick={() => this.props.removeCartItem(product.id)}
          >
            delete
          </button>
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => dispatch(fetchCartProductsThunk()),
    editItemQuan: (productId, product) =>
      dispatch(changeQuantityThunk(productId, product)),
    removeCartItem: (productId) => dispatch(deleteCartProductThunk(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
