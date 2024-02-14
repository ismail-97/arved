
const notification = ""

const notificationReducer = (state = notification, action) => {
    switch (action.type){
        case 'NOTIFY':
            return action.data
        default: return state
    }
}

export const setNotification = (notificationText) => {
    return async dispatch => {
        dispatch ({
            type: 'NOTIFY',
            data: notificationText
        })
    }
}

export default notificationReducer