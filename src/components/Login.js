import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import EmailIcon from '../iconComponents/icons/EmailIcon'
import PasswordIcon from '../iconComponents/icons/PasswordIcon'
import { useDispatch } from 'react-redux'
import { loggedUser } from '../reducers/loginReducer'
import translate from '../i18n/messages/translate'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signIn = (event) => {
    event.preventDefault()
    const email = event.target.username.value
    const password = event.target.password.value
    dispatch(loggedUser({ email, password }))
  }

  return (
    <Form
      onSubmit={signIn}
      className="d-flex flex-column align-items-center text-capitalize p-0 m-0"
    >
      <p className="arved-text my-0 p-0 ">ARVED</p>
      <Notification time="5000" type="error" />
      <InputGroup className="mb-4 w-75 d-flex flex-row-reverse align-items-center arved-input-group ">
        <FormattedMessage id="email">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label"
              type="email"
              name="username"
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <EmailIcon />
      </InputGroup>
      <InputGroup className="mb-4 w-75 d-flex flex-row-reverse align-items-center arved-input-group">
        <FormattedMessage id="password">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label"
              type="password"
              name="password"
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <PasswordIcon />
      </InputGroup>
      <Form.Group className=" my-3 mb-4 text-center button-group">
        <Button type="submit" className="w-100 arved-button1">
          {translate('sign-in')}
        </Button>
      </Form.Group>
      <Form.Group className="text-center ">
        <a href="/register">
          <p className="mb-3 new-account-text "> {translate('new-account')}</p>
        </a>
        {/* <p className="forgot-password-text">
          <a href="/forget-password">{translate('forgot-password')}</a>
        </p> */}
      </Form.Group>
    </Form>
  )
}

const Login = () => {
  return (
    <div className="centeralize">
      <LoginForm />
    </div>
  )
}

export default Login
