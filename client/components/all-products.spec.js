import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './all-products'
import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let allProducts
  let store

  const initialState = {
    products: {}
  }

  beforeEach(() => {
    store = mockStore(initialState)
    allProducts = shallow(<AllProducts products={store} />)
  })

  it('renders correctly with null value for props', () => {
    expect(allProducts.prop('products')).toEqual({})
  })
})

// const props = {
//     value: null
// },
// DateInputComponent = mount(<DateInput {...props} />);
