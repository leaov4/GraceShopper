import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, destroyProduct} from '../store/products'
import AddProduct from './add-product'
import {addProductToCartThunk} from '../store/single-product'
import {increaseQuantityThunk, fetchCartProductsThunk} from '../store/cart'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchProducts()
      this.props.fetchCartProducts()
    } catch (err) {
      this.setState({hasError: true})
    }
  }

  async handleRemove(event) {
    await this.props.destroyProduct(event.target.value)
    this.props.fetchProducts()
  }

  async handleAddProduct(plant) {
    const cartMatch = this.props.cart.filter(
      (product) => product.id === plant.id
    )
    if (cartMatch.length) {
      this.props.increaseQuantity(cartMatch[0].order_product)
    } else {
      await this.props.addProductToCart(plant.id, plant.price)
    }
    this.props.fetchCartProducts()
  }

  render() {
    const products = this.props.products
    const admin = this.props.admin

    if (this.state.hasError || this.state.props === null) {
      return <div>oops! something went wrong here</div>
    } else {
      return (
        <div>
          <div className="all-title">All Products</div>
          <div className="grid-container">
            {products.map((plant) => {
              return (
                <div className="grid-item" key={plant.id}>
                  <img src={plant.imageUrl} className="all-img" />
                  <div className="all-info">
                    <a href={`/products/${plant.id}`} className="all-name">
                      {plant.name}
                    </a>
                    <div className="all-category">{plant.category}</div>
                    <div className="all-descrip">{plant.description}</div>
                    <div className="all-price">{plant.price}</div>
                  </div>
                  <div>{plant.category}</div>
                  <div>{plant.price}</div>
                  <button
                    type="submit"
                    onClick={() => this.handleAddProduct(plant)}
                  >
                    Add to cart
                  </button>
                  {admin ? (
                    <button
                      type="submit"
                      value={plant.id}
                      onClick={this.handleRemove}
                    >
                      X
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              )
            })}
          </div>
          {admin ? <AddProduct /> : <div />}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  admin: state.user.admin,
  cart: state.cart,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    destroyProduct: (id) => dispatch(destroyProduct(id)),
    addProductToCart: (productId, price) =>
      dispatch(addProductToCartThunk(productId, price)),
    increaseQuantity: (order_product) =>
      dispatch(increaseQuantityThunk(order_product)),
    fetchCartProducts: () => dispatch(fetchCartProductsThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
