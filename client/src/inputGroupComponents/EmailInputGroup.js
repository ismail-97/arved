import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import EmailIcon from '../iconComponents/icons/EmailIcon'
import React, { useState, useEffect } from 'react'

const DOMAIN = '@ankara.edu.tr'

const EmailInputGroup = (props) => {
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
            value={props?.email}
            disabled={props?.uneditable}
          />
        )}
      </FormattedMessage>
      <EmailIcon />
    </InputGroup>
  )
}
export default EmailInputGroup
