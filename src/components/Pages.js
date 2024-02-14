
import React from 'react';
import { Link } from "react-router-dom"

import ChangePasswordIcon from '../iconComponents/icons/ChangePasswordIcon'
import ListOfAccountsIcon from '../iconComponents/icons/ListOfAccountsIcon'
import CreateReportIcon from '../iconComponents/icons/CreateReportIcon'
import PendingAccountsIcon from '../iconComponents/icons/PendingAccountsIcon'
import { useSelector, useDispatch } from 'react-redux'

const Pages = () => {
    const user = useSelector(state => state.user)

    if(user)
        if (user.role === "admin")
            return (
                <div className="d-flex my-4 justify-content-center">
                    {/* <Link to="/add-product" className='admin-option'>
                        <ChangePasswordIcon className='admin-option-icon'/>
                        CHANGE PASSWORD
                    </Link> */}
                    <Link to="/admin/department-accounts" className='admin-option'>
                        <ListOfAccountsIcon className='admin-option-icon'/>            
                        LIST OF ACCOUNTS
                    </Link>
                    <Link to="/admin/pending-accounts" className='admin-option'>
                        <PendingAccountsIcon className='admin-option-icon' color="#134383"/>
                        PENDING ACCOUNTS
                    </Link>
                    <Link to="/admin/create-report" className='admin-option'>
                        <CreateReportIcon className='admin-option-icon'/>                    
                        CREATE A REPORT
                    </Link>
                </div>
                )
    return null
}

export default Pages