import React from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/user'

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

  handleSubmit(event) {
    event.preventDefault()
    this.props.createUser(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
  }
}

export default connect(null, mapDispatch)(CreateAccount)
