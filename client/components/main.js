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
        <Link to="/products" className="cart-button">
          Click here for plants
        </Link>
      </div>
    )
  }
}

export default Main
