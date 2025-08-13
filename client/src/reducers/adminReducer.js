import adminService from '../services/admin'

const users = {
    departmentUsers: [],
    pendingUsers: []
}
const userReducer = (state = users, action) => {
    switch (action.type){
        case 'USERS':
            return {
                ...state,
                departmentUsers : [...action.data]
            }
        case 'PENDING_USERS':
            return {
                ...state,
                pendingUsers : [...action.data]
            }
        default: return state
    }
}

export const getDepartmentAccounts = () => {
    return async dispatch => {
        const users = await adminService.getDepartmentUsers()
        dispatch ({
            type: 'USERS',
            data: users
        })
    }
}

export const getPendingAccounts = () => {
    return async dispatch => {
        const pendingUsers = await adminService.getPendingUsers()
        dispatch ({
            type: 'PENDING_USERS',
            data: pendingUsers
        })
    }
}

export const updateUserStatus = (newStatus, id) => {
    return async dispatch => {
        await adminService.changeUserStatus(newStatus, id)
        const pendingUsers = await adminService.getPendingUsers()
        dispatch ({
            type: 'PENDING_USERS',
            data: pendingUsers
        })
    }
}
export default userReducer