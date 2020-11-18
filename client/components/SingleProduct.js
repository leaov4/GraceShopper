import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  addedProductStatus,
  addProductToCartThunk,
} from '../store/single-product'
import UpdateProduct from './update-product'
import {fetchCartProductsThunk, increaseQuantityThunk} from '../store/cart'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
    this.props.getUpdatedCart()
  }

  async handleAddProduct() {
    const cartMatch = this.props.cart.filter(
      (product) => product.id === this.props.product.id
    )
    if (cartMatch.length) {
      await this.props.increaseQuantity(cartMatch[0].order_product)
    } else {
      await this.props.addProductToCart(
        this.props.product.id,
        this.props.product.price
      )
    }
    this.props.getUpdatedCart()
  }

  render() {
    const product = this.props.product

    return (
      <div>
        <div className="single-product">
          <img className="p-img" src={product.imageUrl} />
          <div className="p-info">
            <div className="p-name">{product.name}</div>
            <div className="p-groupings">
              <div className="p-category">{product.category}</div>
              <div className="p-category">{product.climate}</div>
              <div className="p-category">{product.season}</div>
            </div>
            <div className="p-descrip">{product.description}</div>
            <div className="p-footer">
              <div className="p-price">{product.price}</div>
              <button
                className="cart-button"
                type="button"
                onClick={() => this.handleAddProduct()}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {this.props.admin ? <UpdateProduct id={product.id} /> : <div />}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.singleproduct.product,
    cart: state.cart,
    admin: state.user.admin,
  }
}

//on our add product button, onClick call addProductToCart & getUpdatedCart

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    addProductToCart: (productId, price) =>
      dispatch(addProductToCartThunk(productId, price)),
    getUpdatedCart: () => dispatch(fetchCartProductsThunk()),
    getProductStatus: () => dispatch(addedProductStatus()),
    increaseQuantity: (order_product) =>
      dispatch(increaseQuantityThunk(order_product)),
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
