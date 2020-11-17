import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/single-product'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      inventory: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const name = this.state.name
    const price = parseInt(this.state.price, 10)
    const inventory = parseInt(this.state.inventory, 10)

    this.props.updateProduct(this.state, this.props.id)
    this.setState({
      name: price < 1 || inventory < 1 ? name : '',
      price: price < 1 ? 'must be valid number' : inventory < 1 ? price : '',
      inventory:
        inventory < 1 ? 'must be valid number' : price < 1 ? inventory : '',
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label htmlFor="inventory">Inventory:</label>
          <input
            name="inventory"
            type="text"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="text"
            onChange={this.handleChange}
            value={this.state.price}
          />
          {/* <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <label htmlFor="category">Description:</label>
          <input
            name="category"
            type="text"
            onChange={this.handleChange}
            value={this.state.category}
          />
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            name="imageUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <label htmlFor="climate">Climate:</label>
          <input
            name="climate"
            type="text"
            onChange={this.handleChange}
            value={this.state.climate}
          />
          <label htmlFor="season">Season:</label>
          <input
            name="season"
            type="text"
            onChange={this.handleChange}
            value={this.state.season}
          /> */}
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product, x) => dispatch(updateProduct(product, x)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
