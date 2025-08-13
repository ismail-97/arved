import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pages from './Pages'
import Notification from './Notification'

import ProfilePicrtureSmall from '../iconComponents/icons/ProfilePicrtureSmall'
import ApproveIcon from '../iconComponents/icons/ApproveIcon'
import RejectIcon from '../iconComponents/icons/RejectIcon'

import { getPendingAccounts, updateUserStatus } from '../reducers/adminReducer'
import { setNotification } from '../reducers/notificationReducer'

import translate from '../i18n/messages/translate'

const UserFields = ({ user }) => {
  const fieldsToShow = user.fields?.slice(0, 4)

  return (
    <ul className="row">
      {fieldsToShow &&
        fieldsToShow.map((field, index) => (
          <li key={index} className="col-12 field-12-bold-arial">
            <span>{field.substr(0, 40)}</span>
          </li>
        ))}
    </ul>
  )
}

const PendingUsers = ({ users }) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const acceptUser = async (id) => {
    setLoading(true)

    try {
      await dispatch(updateUserStatus('approved', id))
      setLoading(false)
    } catch (error) {
      dispatch(setNotification(error.message))
    }
  }
  const rejectUser = async (id) => {
    setLoading(true)

    try {
      await dispatch(updateUserStatus('rejected', id))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(setNotification(error.message))
    }
  }

  if (users.length < 1)
    return (
      <div className="field-18-bold-arial pl-4 pr-3">
        There is No pending accounts right now.
      </div>
    )
  return users.map((user) => (
    <div
      key={user.id}
      className="col-12 mx-auto py-2 d-flex flex-row align-items-center"
    >
      {loading && <div className="spinner"></div>}
      <Notification time="5000" type="error" />

      <div className="col-8 col-sm-7 col-md-8 col-lg-9 d-flex flex-row align-items-start px-0 px-md-5">
        <div className="mr-3 mr-sm-3">
          <ProfilePicrtureSmall className="pending_account_profile_photo" />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="field-18-bold-arial  text-capitalize">
            {user.name} {user.surname}
          </div>
          <div className="field-12-bold-arial">{user.email}</div>
          <UserFields user={user} />
        </div>
      </div>
      <div className="col-4 col-sm-5 col-md-4 col-lg-3 d-flex flex-row align-items-start justify-content-between justify-content-sm-around">
        <button
          className="col-4 no-style accept-button field-16-bold-arial mb-2"
          onClick={() => acceptUser(user.id)}
        >
          <span className="accept-button-text text-capitalize">
            {translate('accept')}{' '}
          </span>

          <div className="accept-button-icon">
            <ApproveIcon />
            <div className="tooltip-text text-capitalize">
              {translate('accept')}
            </div>
          </div>
        </button>
        <button
          className="col-4 no-style field-16-bold-arial reject-button"
          onClick={() => rejectUser(user.id)}
        >
          <span className="reject-button-text text-capitalize">
            {' '}
            {translate('reject')}
          </span>
          <div className="reject-button-icon">
            <RejectIcon />
            <div className="tooltip-text text-capitalize">
              {translate('reject')}
            </div>
          </div>
        </button>
      </div>
    </div>
  ))
}
const PendingAccounts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPendingAccounts())
  }, [dispatch])

  const pendingUsers = useSelector((state) => state.users.pendingUsers)
  if (!pendingUsers) {
    return <div className="spinner"></div>
  }

  pendingUsers.sort((a, b) =>
    `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`)
  )

  return (
    <div className="content">
      <Pages />
      <div className="page-title-text text-center mt-2 mb-3 text-capitalize">
        {translate('pendingAccounts')}
      </div>

      <div className="profile d-flex m-0 row py-3 h-100">
        <PendingUsers users={pendingUsers} />
      </div>
    </div>
  )
}

export default PendingAccounts
