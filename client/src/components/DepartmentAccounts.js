import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pages from '../components/Pages'
import ProfilePicrtureSmall from '../iconComponents/icons/ProfilePicrtureSmall'
import PendingAccountsIcon from '../iconComponents/icons/PendingAccountsIcon'

import { getDepartmentAccounts } from '../reducers/adminReducer'
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

const DepartmentUsers = ({ users }) => {
  return users.map((user) => {
    if (user.status !== 'rejected')
      return (
        <div
          key={user.id}
          className="col-12 col-md-6 mx-lg-auto col-xl-6  py-2 d-flex flex-column"
        >
          <div className="d-flex flex-row align-items">
            <div className="mr-2 mt-0">
              <ProfilePicrtureSmall />
            </div>
            <div className="d-flex flex-column w-100 mt-1">
              <div className="d-flex flex-row align-items-center">
                <div className="field-18-bold-arial mr-2">
                  {user.name} {user.surname}
                </div>
                {user.status === 'pending' && (
                  <PendingAccountsIcon color="#dc3545" />
                )}
              </div>
              <UserFields user={user} />
            </div>
          </div>
        </div>
      )
    return null
  })
}

const DepartmentAccounts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepartmentAccounts())
  }, [dispatch])

  const users = useSelector((state) => state.users.departmentUsers)
  const user = useSelector((state) => state.loginInfo)
  if (!users) {
    return <div className="spinner"></div>
  }
  users.sort((a, b) =>
    `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`)
  )

  return (
    <div className="content text-capitalize">
      <Pages />
      <div className="page-title-text text-center mt-2 mb-3">
        {translate('listOfAccounts')}
      </div>
      <div className="form-text mb-2">{translate(user.department)}</div>
      <div className="profile  d-flex m-0 row py-3 h-100">
        <DepartmentUsers users={users} />
      </div>
    </div>
  )
}

export default DepartmentAccounts
