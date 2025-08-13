import React, { useEffect } from 'react'
import ProfilePictureIcon from '../iconComponents/icons/ProfilePicture'
import EditProfileIcon from '../iconComponents/icons/EditProfile'
import { getUserInfo } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import translate from '../i18n/messages/translate'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  const user = useSelector((state) => state.user)
  if (user) {
    return (
      <div className="text-capitalize">
        <h4 className="title">
          <span>{translate(user.title)} </span>
          <span>
            {user.name} {user.surname}
          </span>
        </h4>
        <h5 className="department font-20">
          {' '}
          {translate(`Department of ${user.department}`)}
        </h5>
        <div className="container">
          <div className="row fields">
            {user.fields.slice(0, 4).map((field) => (
              <span key={field} className="field col-12 col-sm-6">
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
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const editAccount = (user) => {
    dispatch(setNotification(''))

    navigate(`/edit-account`, { state: user })
  }

  return (
    <div className="profile d-flex justify-content-between m-auto ">
      <div className="d-flex w-100 ">
        <ProfilePictureIcon className="profile-photo" />
        <div className="userInfo pl-2 pl-md-0">
          <UserInfo className="" />

          <button
            className="d-flex arved-button2 align-items-center mr-1 mr-sm-3"
            onClick={() => editAccount(user)}
          >
            <EditProfileIcon className="mx-1" />
            {translate(`edit`)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
