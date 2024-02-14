import React, { useEffect } from 'react'
import ProfilePictureIcon from '../iconComponents/icons/ProfilePicture'
import EditProfileIcon from '../iconComponents/icons/EditProfile'
import { getUserInfo } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import translate from '../i18n/messages/translate'

let i = 0

const UserInfo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  const user = useSelector((state) => state.user)
  if (user) {
    return (
      <div className="w-75 text-capitalize userInfo">
        <h4 className="title">
          <span>{user.title} </span>
          <span>
            {user.name} {user.surname}
          </span>
        </h4>
        <h5 className="department">
          {' '}
          {translate(`Department of ${user.department}`)}
        </h5>
        <div className="container p-0">
          <div className="row w-100 justify-content-start pl-3">
            {user.fields.map((field) => (
              <span key={i++} className="field col-6">
                {field}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

const Profile = () => {
  return (
    <div className="profile d-flex justify-content-between m-0">
      <div className="d-flex mx-5 align-items-center">
        <ProfilePictureIcon />
        <UserInfo />
      </div>
      <div className="my-3 mr-5">
        <button className="d-flex arved-button2 align-items-center">
          <EditProfileIcon className="mx-1" />
          {translate(`edit`)}
        </button>
      </div>
    </div>
  )
}

export default Profile
