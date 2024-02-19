import React, { useEffect } from 'react'
import Pages from '../components/Pages'
import ProfilePicrtureSmall from '../iconComponents/icons/ProfilePicrtureSmall'
import { useSelector, useDispatch } from 'react-redux'
import { getPendingAccounts, updateUserStatus } from '../reducers/adminReducer'

const UserFields = ({ user }) => {
  if (user.fields.length > 4) user.fields = user.fields.slice(0, 4)
  return (
    <ul className="row">
      {user.fields.slice(0, 4).map((field) => {
        return (
          <li
            key={user.fields.indexOf(field)}
            className="col-12 field-12-bold-arial"
          >
            <span>{field.substr(0, 40)}</span>
          </li>
        )
      })}
    </ul>
  )
}

const PendingUsers = ({ users }) => {
  const dispatch = useDispatch()
  const acceptUser = (id) => {
    dispatch(updateUserStatus('approved', id))
  }
  const rejectUser = (id) => {
    dispatch(updateUserStatus('rejected', id))
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
      <div className="col-9 d-flex flex-row align-items-start ">
        <div className="mr-3">
          <ProfilePicrtureSmall />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="field-18-bold-arial  text-capitalize">
            {user.name} {user.surname}
          </div>
          <div className="field-12-bold-arial">{user.email}</div>
          <UserFields user={user} />
        </div>
      </div>
      <div className="col-3 d-flex flex-row align-items-start justify-content-around">
        <button
          className="no-style accept-button field-16-bold-arial"
          onClick={() => acceptUser(user.id)}
        >
          Accept
        </button>
        <button
          className="no-style reject-button field-16-bold-arial"
          onClick={() => rejectUser(user.id)}
        >
          Reject
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
  pendingUsers.sort((a, b) =>
    `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`)
  )

  return (
    <div className="content">
      <Pages />
      <div className="page-title-text text-center mt-2 mb-3 text-capitalize">
        Pending Accounts
      </div>

      <div className="profile d-flex m-0 row py-3 h-100">
        <PendingUsers users={pendingUsers} />
      </div>
    </div>
  )
}

export default PendingAccounts
