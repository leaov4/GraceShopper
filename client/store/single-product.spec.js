import {expect} from 'chai'
import axios from 'axios'
import {fetchSingleProduct} from './single-product'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const product = {
  id: 1,
  name: 'Lily',
  price: 15.0,
  category: 'Flowering Plant',
  climate: 'Cool',
  season: 'Winter',
  description:
    'A genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. Lilies are a group of flowering plants which are important in culture and literature in much of the world.',
  inventory: 20,
  imageUrl:
    'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326767974-6UG31CD8FBVD689DA8X3/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Ecomm_02_Lily_004.jpg?format=750w',
}

describe('fetchSingleProduct', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('single product reducer', () => {
    it("sets the action's product on state", () => {
      const prevState = store.getState()

      const action = {type: 'SET_SINGLE_PRODUCT', product: product}
      store.dispatch(action)

      const newState = store.getState()

      expect(newState.product).to.be.deep.equal(product)
      expect(newState.product).to.not.be.equal(prevState.product)
    })
  })

  describe('singleProduct get succeeds', () => {
    beforeEach(() => {
      mockAxios.onGet(`/api/products/${product.id}`).reply(200, product)
    })
    it('sets the received product on state', async () => {
      await store.dispatch(fetchSingleProduct(product.id))
      const state = store.getState()
      expect(state.product).to.deep.equal(product)
    })
  })
})
