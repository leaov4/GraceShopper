import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
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
          <button className="p-addcart" type="button">
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapProps = (state) => {
  return {
    product: state.singleproduct.product,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  }
}

export default connect(mapProps, mapDispatch)(SingleProduct)
