import loginService from '../services/login'

const faculties = []

const facultiesReducer = (state = faculties, action) => {
    switch (action.type){
        case 'ALL_FACULTIES':
            return action.data
        default: return state
    }
}

export const getAllFaculties = () => {
    return async dispatch => {
        const faculties = await loginService.getFaculties()
        dispatch ({
            type: 'ALL_FACULTIES',
            data: faculties
        })
    }
}

export default facultiesReducer