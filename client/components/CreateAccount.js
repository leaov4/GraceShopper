import React from 'react'
import {connect} from 'react-redux'
import {createUser, auth, createInitialOrder} from '../store/user'

class CreateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
    await this.props.createUser(this.state)
    await this.props.loginUser(this.state.email, this.state.password, 'login')
    await this.props.createOrder()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-title-signup">Sign Up</div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            minLength="6"
            required
          />
          <div>
            <button button type="submit" className="cart-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    loginUser: (email, password, method) =>
      dispatch(auth(email, password, method)),
    createOrder: () => dispatch(createInitialOrder()),
  }
}

export default connect(null, mapDispatch)(CreateAccount)
