import React from 'react'
import {Link} from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main-title">Welcome to the Plant Palace</div>
        <div className="main-subtitle">
          Have a look around at our beautiful plants.
        </div>
        <div className="main-subtitle">
          Sign up with an email address to add plants to your cart and submit an
          order.
        </div>
        <Link to="/products" className="cart-button">
          Click here for plants
        </Link>
      </div>
    )
  }
}

export default Main
