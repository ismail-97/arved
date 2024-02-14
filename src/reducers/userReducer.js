import userService from '../services/profile'

const initialUser = null
const userReducer = (state = initialUser, action) => {
    switch (action.type){
        case 'USER_INFO':
            return action.data
        
        default: return state
    }
}

export const getUserInfo = () => {
    return async dispatch => {
        const userInfo = await userService.getInfo()
        dispatch ({
            type: 'USER_INFO',
            data: userInfo
        })
    }
}

export default userReducer