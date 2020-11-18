import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, admin, name} = props

  return (
    <div className="message-component">
      <h3>Welcome, {name}</h3>
      <div className="message-text">Email: {email} </div>
      {admin ? (
        <div>
          <div className="message-text">
            You are an admin. To view your admin page to add view all users,
            click:{' '}
          </div>
          <a href="/admin">My Admin Page</a>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    admin: state.user.admin,
    name: state.user.firstName,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
