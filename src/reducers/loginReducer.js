import loginService from '../services/login'
import {setToken} from '../services/token'

const user = null
const loginReducer = (state = user, action) => {
    switch (action.type){
        case 'LOGIN':
            return action.data
        case 'REGISTER':
            return action.data
        case 'CLEAR':
            return null 
        default: return state
    }
}

export const loggedUser = ({email, password}) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ email: email, password: password })
            setToken(user.token)
            window.localStorage.setItem('userInfo', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (error) {
            //implement a notification for this part
            console.log("your email or your password is not correct")
        }
    }
}

export const preLoggedUser = user => {
    return async dispatch => {
        dispatch ({
            type: 'LOGIN',
            data: user
        })
    }
}

export const registerUser = (newUser) => {
    return async dispatch => {
        try {
            await loginService.register(newUser)
            dispatch({
                type: 'REGISTER',
                data: null
            })
        } catch (error) {
            //implement a notification for this part
            console.log("ERROR WHILE SIGNING UP")
            throw error
        }
    }
}

export const clearLoginInfo = () => {
    return async dispatch => {
        dispatch ({
            type: 'CLEAR'
        })
    }    
}
export default loginReducer