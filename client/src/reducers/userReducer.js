import userService from '../services/profile'

const initialUser = null
const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case 'USER_INFO':
      return action.data
    case 'EDIT_USER':
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      const userInfo = await userService.getInfo()
      dispatch({
        type: 'USER_INFO',
        data: userInfo,
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

export const editUser = (editedUserInfo) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.editUser(editedUserInfo)
      dispatch({
        type: 'EDIT_USER',
        data: updatedUser,
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

export default userReducer
