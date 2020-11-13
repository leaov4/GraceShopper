import React from 'react'
import {Link} from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
      <>
        <h1>WELCOME TO THE PLANT PALACE</h1>
        <h3>Have a look around at our beautiful plants.</h3>
        <Link to="/products">Click here for plants</Link>
      </>
    )
  }
}

export default Main
