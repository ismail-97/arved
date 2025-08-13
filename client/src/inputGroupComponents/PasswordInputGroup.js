import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import PasswordIcon from '../iconComponents/icons/PasswordIcon'
import React, { useState } from 'react'

const PasswordInputGroup = ({ setPassword }) => {
  const [isInvalid, setIsInvalid] = useState(false)

  const handlePasswordChange = (event) => {
    const password = event.target.value
    setPassword(password)
    setIsInvalid(password.length > 0 && password.length < 8)
  }

  return (
    <div>
      {isInvalid && (
        <div className="text-danger field-12-arial">
          Password must be at least 8 characters long
        </div>
      )}
      <InputGroup className="arved-input-group">
        <FormattedMessage id="password">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label2"
              type="password"
              name="password"
              placeholder={placeholder}
              required
              onChange={handlePasswordChange}
            />
          )}
        </FormattedMessage>
        <PasswordIcon />
      </InputGroup>
    </div>
  )
}
export default PasswordInputGroup
