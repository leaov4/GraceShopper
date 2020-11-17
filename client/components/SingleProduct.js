import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  addedProductStatus,
  updateProduct,
  addProductToCartThunk
} from '../store/single-product'
import UpdateProduct from './update-product'
import {fetchCartProductsThunk} from '../store/cart'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
  }

  async handleAddProduct() {
    await this.props.addProductToCart(
      this.props.product.id,
      this.props.product.price
    )
    this.props.getUpdatedCart()
  }

  render() {
    const product = this.props.product

    return (
      <div>
        <div className="single-product">
          <img className="p-img" src={product.imageUrl} />
          <h1 className="p-name">{product.name}</h1>
          <h2 className="p-category">{product.category}</h2>
          <h2 className="p-climate">{product.climate}</h2>
          <h2 className="p-season">{product.season}</h2>
          <h3 className="p-descrip">{product.description}</h3>
          <h4 className="p-price">{product.price}</h4>
        </div>
        <div>
          <button
            className="p-addcart"
            type="button"
            onClick={() => this.handleAddProduct()}
          >
            Add to Cart
          </button>
        </div>
        {this.props.admin ? <UpdateProduct id={product.id} /> : <div />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleproduct.product,
    cart: state.cart,
    admin: state.user.admin
  }
}

//on our add product button, onClick call addProductToCart & getUpdatedCart

const mapDispatch = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToCart: (productId, price) =>
      dispatch(addProductToCartThunk(productId, price)),
    getUpdatedCart: () => dispatch(fetchCartProductsThunk()),
    getProductStatus: () => dispatch(addedProductStatus())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
