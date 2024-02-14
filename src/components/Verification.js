import React, {useState} from 'react'
import { FormattedMessage } from 'react-intl'
import translate from '../i18n/messages/translate'

import ModalMessage from '../components/ModalMessage'
import { useNavigate } from "react-router-dom"

const Verification = (props) => {
    const [modalShow, setModalShow] = useState(true);
    const navigate = useNavigate()    
    // setTimeout(() => navigate("/"), 3000)

    const navigateToLogin = () => {
        setModalShow(false)
        navigate("/")
    }
    return (
        <ModalMessage
            show={modalShow}
            onHide  ={navigateToLogin}
            header  ={translate("successfullVerificationHeader")}
            body    ={translate("successfullVerificationBody")}
            footer  = ''
            footertype  = 'sentence'
            button  =''
        />          
    )
}

export default Verification