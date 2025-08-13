import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearLoginInfo } from '../reducers/loginReducer'
import { editUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import translate from '../i18n/messages/translate'

const ModalMessage = (props) => {
  return (
    <Modal {...props} centered>
      <Modal.Body className="px-5 py-4 text-center">
        <div className="mb-4 title" style={{ fontSize: 40 }}>
          {props.header}
        </div>
        <div className="mb-4 title" style={{ fontSize: 24 }}>
          {props.body}
        </div>
        <Footer footer={props.footer} type={props.footertype} />
        <ModalButton text={props.button} />
        <ModalButton text={props.second_button} />
      </Modal.Body>
    </Modal>
  )
}

const Footer = ({ footer, type }) => {
  if (type === 'link') {
    return (
      <div className="mb-4">
        <a
          href="/"
          className="title text-underline"
          style={{
            fontSize: 24,
            fontWeight: 'normal',
            textDecorationLine: 'underline',
          }}
        >
          {footer}
        </a>
      </div>
    )
  }
  if (type === 'label') {
    return null
  }
  if (type === 'sentence') {
    return (
      <div className="mb-4 title" style={{ fontSize: 24 }}>
        {footer}
      </div>
    )
  }
  return null
}

const ModalButton = ({ text }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    setLoading(true)

    try {
      window.localStorage.clear()
      await dispatch(clearLoginInfo())
      navigate('/')
      window.location.reload()
    } catch (error) {
      dispatch(setNotification(error.message))
    }
  }

  const appeal = async () => {
    setLoading(true)

    try {
      await dispatch(editUser({ status: 'pending' }))
      setLoading(false)
      window.localStorage.clear()
      window.location.reload()
    } catch (error) {
      setLoading(false)
      dispatch(setNotification(error.message))
    }
  }

  if (text === 'Log Out')
    return (
      <button className="arved-button4 text-center" onClick={logout}>
        {translate('logOut')}
      </button>
    )
  else if (text === 'Send')
    return (
      <button className="arved-button4 text-center" onClick={appeal}>
        {translate('send')}
      </button>
    )
  else if (text === 'appeal')
    return (
      <button className="arved-button3 text-center" onClick={appeal}>
        {translate('appeal')}
      </button>
    )
  return null
}

export default ModalMessage
