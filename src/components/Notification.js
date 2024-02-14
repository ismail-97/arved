
import { useSelector } from 'react-redux'
import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    if (notification && notification.length > 0) {

        setTimeout(() => {
            dispatch(setNotification(''))         
        }, 3000);
        
        return (
            <div className=" mb-3 text-center title border-success border bg-light rounded" style={{fontSize: 24, color: "#28a745"}} >
                {notification}
            </div>
            )

    }
    return null
}

export default Notification