import React, { useEffect } from 'react'
import Pages from '../components/Pages'
import ProfilePicrtureSmall from '../iconComponents/icons/ProfilePicrtureSmall'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentAccounts } from '../reducers/adminReducer'
import PendingAccountsIcon from '../iconComponents/icons/PendingAccountsIcon'

const UserFields = ({ user }) => {
    if (user.fields.length > 4)
        user.fields = user.fields.slice(0, 4)
    return (
        <ul className="row pl-3 m-0">
            {user.fields.map(field =>
            {
                return(
                    <li key={user.fields.indexOf(field)} className='col-6 field-12-bold-arial' >
                        <span>{field}</span>
                    </li>
                )
                }
            )}

        </ul>
        )  
}

const DepartmentUsers = ({ users }) => {
    return (users.map(user =>  
        <div  key={user.id} className='col-12 col-lg-6 mx-lg-auto col-xl-6 px-3 py-2 d-flex flex-column'>
            <div className="d-flex flex-row align-items">
                <div className="mr-2 mt-0">
                    <ProfilePicrtureSmall/>
                </div>
                <div className="d-flex flex-column w-100 mt-1">
                    <div className="d-flex flex-row align-items-center"> 
                        <div className="field-18-bold-arial mr-2">{user.name} {user.surname}</div>
                        {user.status === "pending" && <PendingAccountsIcon color="#dc3545" />}
                    </div>
                    <UserFields user={user}/>
                </div>
            </div> 
        </div> 
        )
    )   
}

const DepartmentAccounts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartmentAccounts())
    }, [dispatch])

    const users = useSelector(state => state.users.departmentUsers)
    const user = useSelector(state => state.loginInfo)
    users.sort((a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`))

    return (
        <div className='content text-capitalize'>
            <Pages/>
            <div className='product-text text-center mt-2 mb-3' style={{fontSize: 42}}>List of Accounts</div>
            <div className='product-text mb-2 ml-5' style={{ fontSize: 30 }}>{user.department}</div>
            <div className='profile d-flex m-0 px-5 row py-3 h-100'>
                <DepartmentUsers users={users}/>
            </div>
        </div>
    )
}


export default DepartmentAccounts