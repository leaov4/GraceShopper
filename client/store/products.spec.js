/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get products', () => {
    it('eventually dispatches the GET PRODUCT action', async () => {
      const fakeProducts = [{name: 'Cactus'}, {name: 'flower'}, {name: 'lilly'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  // describe('add product', () => {
  //   it('eventually dispatches the ADD PRODUCT action', async () => {
  //     const fakeProduct = {name: 'grass'}

  //     mockAxios.onPost('/api/products').replyOnce(200, fakeProduct)
  //     await store.dispatch(createProduct(fakeProduct))

  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('ADD_PRODUCT')
  //     expect(
  //       actions[0].products[actions[0].products.length - 1]
  //     ).to.be.deep.equal(fakeProduct)
  //   })
  // })

  //   describe('delete product', () => {
  //     it('deleteProduct: eventually dispatches the DELETE_PRODUCT action', async () => {
  //       mockAxios.onPost('/api/products/:id').replyOnce(204)
  //       await store.dispatch(destroyProduct())
  //       const actions = store.getActions()
  //       expect(actions[0].type).to.be.equal('DELETE_PRODUCT')
  //       expect(actions[0].user).to.be.deep.equal(fakeUser)
  //     })
  //   })
})
