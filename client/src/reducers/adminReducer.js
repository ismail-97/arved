import adminService from '../services/admin'

const users = {
  departmentUsers: null,
  pendingUsers: null,
}
const userReducer = (state = users, action) => {
  switch (action.type) {
    case 'USERS':
      return {
        ...state,
        departmentUsers: [...action.data],
      }
    case 'PENDING_USERS':
      return {
        ...state,
        pendingUsers: [...action.data],
      }
    default:
      return state
  }
}

export const getDepartmentAccounts = () => {
  return async (dispatch) => {
    try {
      const users = await adminService.getDepartmentUsers()
      dispatch({
        type: 'USERS',
        data: users,
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

export const getPendingAccounts = () => {
  return async (dispatch) => {
    const pendingUsers = await adminService.getPendingUsers()
    dispatch({
      type: 'PENDING_USERS',
      data: pendingUsers,
    })
  }
}

export const updateUserStatus = (newStatus, id) => {
  return async (dispatch) => {
    try {
      await adminService.changeUserStatus(newStatus, id)
      const pendingUsers = await adminService.getPendingUsers()
      dispatch({
        type: 'PENDING_USERS',
        data: pendingUsers,
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
