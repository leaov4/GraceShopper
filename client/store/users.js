import axios from 'axios'

//ACTION TYPES
const GET_USERS = 'GET_USERS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getUsers = users => ({type: GET_USERS, users})

//THUNK CREATOR for ADMIN get route
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/admin')
    console.log('data', data)
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
