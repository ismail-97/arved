import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import EmailIcon from '../iconComponents/icons/EmailIcon'
import React, { useState, useEffect } from 'react'

const EmailInputGroup = (props) => {
  const [email, setEmail] = useState(props?.email || '')

  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="email">
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="email"
            name="email"
            placeholder={placeholder}
            required
            defaultValue={email}
            disabled={props?.uneditable ? true : false}
          />
        )}
      </FormattedMessage>
      <EmailIcon />
    </InputGroup>
  )
}
export default EmailInputGroup
