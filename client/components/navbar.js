import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// import logo from '../../public/assets/Plant_Logo.png'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <Link to="/home">
        <img
          className="logo"
          src="https://asset.bloomnation.com/c_fit,f_auto,h_1000,q_auto,w_1000/v1/vendor/7838/profile/uniqueFlowerFashions-logo_5eab26b3a20e3.png"
        />
      </Link>
      <Link to="/products" className="nav-shop">
        Shop
      </Link>
      <div className="nav-right">
        <Link to="/cart" className="nav-cart">
          Cart
        </Link>

        {isLoggedIn ? (
          <div className="nav-logged">
            {/* The navbar will show these links after you log in */}
            <a href="#" className="nav-logged" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <Link to="/login" className="nav-logged">
            Login
          </Link>
        )}
      </div>
    </nav>

    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
