import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import PasswordIcon from '../iconComponents/icons/PasswordIcon'
import React, { useState } from 'react'

const RepeatedPasswordInputGroup = ({ password }) => {
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [isMismatch, setIsMismatch] = useState(false)

  const handleRepeatedPasswordChange = (event) => {
    const newRepeatedPassword = event.target.value
    setRepeatedPassword(newRepeatedPassword)
    setIsMismatch(newRepeatedPassword !== password)
  }
  return (
    <div>
      {isMismatch && (
        <div className="text-danger field-12-arial">
          Passwords doesn't match
        </div>
      )}
      <InputGroup className="arved-input-group">
        <FormattedMessage id="repeatedPassword">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label2"
              type="password"
              name="repeatedPassword"
              placeholder={placeholder}
              required
              onChange={handleRepeatedPasswordChange}
            />
          )}
        </FormattedMessage>
        <PasswordIcon />
      </InputGroup>
    </div>
  )
}
export default RepeatedPasswordInputGroup
