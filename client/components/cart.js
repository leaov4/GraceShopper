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
    let cartProducts = this.props.cartProducts

    return (
      <div>
        <h1>Cart</h1>
        <div className="cartProducts">
          {cartProducts.map((item) => (
            <div key={item.id}>
              {/* or it could be productId */}
              <img src={item.imageUrl} />
              <h6>{item.name}</h6>
              <h5>{item.price}</h5>
            </div>
          ))}
          <button type="button">-</button>
          <h6>1</h6>
          <button type="button">+</button>
          <button
            type="button"
            onClick={() => this.props.removeCartItem(cartProducts.id)}
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
          {/* might change the checkout button to link */}
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
