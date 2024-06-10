import Modal from 'react-bootstrap/Modal'
import React from 'react'
import { clearLoginInfo } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { editUser } from '../reducers/userReducer'

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
  //   const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.clear()
    dispatch(clearLoginInfo())
    // navigate('/')
    window.location.reload()
  }
  const appeal = () => {
    dispatch(editUser({ status: 'pending' }))
    window.localStorage.clear()

    // navigate('/')
    window.location.reload()
  }

  if (text === 'Log Out')
    return (
      <button className="arved-button4 text-center" onClick={logout}>
        {text}
      </button>
    )
  else if (text === 'Send')
    return (
      <button className="arved-button4 text-center" onClick={appeal}>
        {text}
      </button>
    )
  else if (text === 'Appeal')
    return (
      <button className="arved-button3 text-center" onClick={appeal}>
        {text}
      </button>
    )
  return null
}

export default ModalMessage
