import React from 'react'
import { useState } from 'react';
import { FormattedMessage } from 'react-intl'
import translate from '../i18n/messages/translate'

import Profile from '../components/Profile'
import Products from '../components/Products'
import Pages from '../components/Pages'
import { useSelector } from 'react-redux'
import ModalMessage from '../components/ModalMessage'

const Content = () => {
    const user = useSelector(state => state.loginInfo)
    const [modalShow, setModalShow] = useState(true);

    if (user)
        if (!user.isVerified){
            return (
                <ModalMessage
                    show={modalShow}
                    onHide={() => setModalShow(true)}
                    header={translate("unverifiedModalHeader")}
                    body={translate("unverifiedModalBody")}
                    footer={translate("unverifiedModalFooter")}
                    footertype='link'
                    button='Log Out'
                />
            )
        }
        else if (user.status === "pending") 
        {
            return (
                <ModalMessage
                    show={modalShow}
                    onHide={() => setModalShow(true)}
                    header={translate("pendingModalHeader")}
                    body={translate("pendingModalBody")}
                    footer={translate("pendingModalFooter")}
                    footertype='sentence'
                    button='Log Out'
                />
            )
        } 
        else return (
            <div className='content '>
                    <Pages/>
                    <Profile />
                    <Products />
                </div> 
        )
}

export default Content