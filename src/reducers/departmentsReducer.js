import loginService from '../services/login'

const departments = []

const departmentsReducer = (state = departments, action) => {
    switch (action.type){
        case 'ALL_DEPARTMENTS':
            return action.data
        default: return state
    }
}

export const getAllDepartments = (faculty) => {
    return async dispatch => {
        const departments = await loginService.getDepartments(faculty)
        dispatch ({
            type: 'ALL_DEPARTMENTS',
            data: departments
        })
    }
}

export default departmentsReducer