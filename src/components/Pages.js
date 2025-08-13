import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import ChangePasswordIcon from '../iconComponents/icons/ChangePasswordIcon'
import ListOfAccountsIcon from '../iconComponents/icons/ListOfAccountsIcon'
import CreateReportIcon from '../iconComponents/icons/CreateReportIcon'
import PendingAccountsIcon from '../iconComponents/icons/PendingAccountsIcon'
import { getUserInfo } from '../reducers/userReducer'

import translate from '../i18n/messages/translate'

const Pages = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  const user = useSelector((state) => state.user)
  if (user)
    if (user.role === 'admin') {
      return (
        <div className="row my-4 justify-content-center d-none d-md-flex">
          {/* <Link to="/add-product" className='admin-option'>
                        <ChangePasswordIcon className='admin-option-icon'/>
                        CHANGE PASSWORD
                    </Link> */}
          <Link to="/admin/department-accounts" className="admin-option">
            <ListOfAccountsIcon className="admin-option-icon" />
            <span className="admin-option-text text-uppercase">
              {translate('listOfAccounts')}
            </span>
          </Link>
          <Link to="/admin/pending-accounts" className="admin-option">
            <PendingAccountsIcon
              className="admin-option-icon"
              color="#134383"
            />
            <span className="admin-option-text text-uppercase">
              {translate('pendingAccounts')}
            </span>
          </Link>
          <Link to="/admin/create-report" className="admin-option ">
            <CreateReportIcon className="admin-option-icon" />
            <span className="admin-option-text text-uppercase">
              {translate('createReport')}
            </span>
          </Link>
        </div>
      )
    }
  return null
}

export default Pages
