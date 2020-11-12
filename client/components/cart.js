import React from 'react'
import {useHistory} from 'react-router-dom'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {  }
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
          <button type="button">delete</button>
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

export default Cart
