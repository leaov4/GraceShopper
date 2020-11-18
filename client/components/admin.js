import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users.js'

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    try {
      this.props.fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  //need get route for admin to get user data, right now first and last are undefined
  render() {
    console.log('users for admin', this.props.users)
    let users = this.props.users

    return (
      <div className="message-component">
        <h1>Admin Page</h1>
        <h3 className="message-text">All users data: </h3>
        {users.map((item) => {
          return (
            <div className="message-text">
              <div>{item.id}</div>
              <div>{`${item.firstName} ${item.lastName} `}</div>
              <div>{` ${item.email}`}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(mapState, mapDispatch)(Admin)
