import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/products'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      category: '',
      climate: '',
      season: '',
      description: '',
      inventory: '',
      imageUrl: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    const name = this.state.name
    const price = this.state.price
    const category = this.state.category
    const climate = this.state.climate
    const season = this.state.season
    const description = this.state.description
    const inventory = this.state.inventory
    const imageUrl = this.state.imageUrl

    await this.props.createProduct(this.state)

    this.setState({
      name: '',
      price: price < 1 ? 'must be valid number' : '',
      category: '',
      climate: '',
      season: '',
      description: '',
      inventory: inventory < 1 ? 'must be valid number' : '',
      imageUrl: '',
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
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <label htmlFor="category">Category:</label>
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
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="text"
            onChange={this.handleChange}
            value={this.state.price}
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
          />
          <label htmlFor="inventory">Inventory:</label>
          <input
            name="inventory"
            type="text"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
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
    createProduct: (product) => dispatch(createProduct(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
