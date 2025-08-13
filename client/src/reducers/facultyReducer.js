
const faculty = null
const facultyReducer = (state = faculty, action) => {
    switch (action.type){
        case 'SELECT_FACULTY':
            return action.data
        default: return state
    }
}

export const setFaculty = (faculty) => {
    return async dispatch => {
        dispatch ({
            type: 'SELECT_FACULTY',
            data: faculty
        })
    }
}

export default facultyReducer