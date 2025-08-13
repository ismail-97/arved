import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import EmailIcon from '../iconComponents/icons/EmailIcon'
import React, { useState, useEffect } from 'react'

const DOMAIN = '@ankara.edu.tr'

const EmailInputGroup = (props) => {
  const [email, setEmail] = useState(() => {
    const initial = props?.email || ''
    return initial.replace('@ankara.edu.tr', '')
  })

  

  const handleChange = (e) => {
    const value = e.target.value
    if (value.includes(DOMAIN)) {
      setEmail(value.replace(DOMAIN, ''))
    } else {
      setEmail(value)
    }
  }

  const handleKeyDown = (e) => {

    const input = e.target
    const cursorPos = input.selectionStart
    const domainStart = email.length

    if (e.key === "@") {
      e.preventDefault()
    }
    if (cursorPos > domainStart || (cursorPos === domainStart && e.key === "Delete")) {
      e.preventDefault()
      input.setSelectionRange(domainStart, domainStart)
    }
  }


  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="email">
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="text"
            name="email"
            placeholder={placeholder}
            required
            value={email && `${email}${DOMAIN}`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={props?.uneditable}
          />
        )}
      </FormattedMessage>
      <EmailIcon />
    </InputGroup>
  )
}
export default EmailInputGroup
