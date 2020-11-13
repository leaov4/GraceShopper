import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CREATED_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const createdUser = (user) => ({
  type: CREATED_USER,
  user,
})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const createUser = (newUser) => async (dispatch) => {
  try {
    const {data: existingUser} = await axios.get(`/api/users/signup`, {
      params: {
        email: newUser.email,
      },
    })
    if (existingUser) {
      alert('That user already exists!')
    } else {
      const {data: user} = axios.post(`/api/users/signup`, newUser)
      dispatch(createdUser(user))
      alert('Sign up successful!')
    }
  } catch (err) {
    console.log('There was an error creating new user.')
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
