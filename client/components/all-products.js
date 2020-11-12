import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, destroyProduct} from './store/products'
import AddProduct from './add-product'

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
    } catch (err) {
      this.setState({hasError: true})
    }
  }

  handleRemove(event) {
    this.props.destroyProduct(event.target.value)
  }

  render() {
    const products = this.props.products

    if (this.state.hasError || this.state.props === null) {
      return <div>oops! something went wrong here</div>
    } else {
      return (
        <div>
          <div>All Products</div>
          <div className="grid-container">
            {products.map((plant) => {
              return (
                <div className="item" key={plant.id}>
                  <img src={plant.imageUrl} />
                  <div>{plant.name}</div>
                  <div>{plant.category}</div>
                  <div>{plant.price}</div>
                  <button
                    type="submit"
                    value={plant.id}
                    onClick={this.handleRemove}
                  >
                    X
                  </button>
                </div>
              )
            })}
          </div>
          <AddProduct />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    destroyProduct: (id) => dispatch(destroyProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
