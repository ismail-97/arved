import loginService from '../services/login'
import { setToken } from '../services/token'

const user = null
const loginReducer = (state = user, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'REGISTER':
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const loggedUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        email: email,
        password: password,
      })
      setToken(user.token)
      window.localStorage.setItem('userInfo', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const preLoggedUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const registerUser = (newUser) => {
  return async (dispatch) => {
    try {
      await loginService.register(newUser)
      dispatch({
        type: 'REGISTER',
        data: null,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const clearLoginInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'CLEAR',
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const sendPasswordLink = (email) => {
  return async () => {
    try {
      console.log(email)

      await loginService.sendPasswordLink({ email: email })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        console.log(error)
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export default loginReducer
