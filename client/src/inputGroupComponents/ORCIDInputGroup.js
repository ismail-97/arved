import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AcademicIdIcon from '../iconComponents/icons/AcademicIdIcon'
import React, { useState } from 'react'

const ORCIDInputGroup = (props) => {
  const [isInvalid, setIsInvalid] = useState(false)
  
  const handleORCIDChange = (event) => {
    const orcid = event.target.value
    const isValid = /^\d+$/.test(orcid);
    setIsInvalid(!isValid)
  }

  return (
    <div>
      {isInvalid && (
        <div className="text-danger field-12-arial">
          ORCID must be of numbers only
        </div>
      )}
      <InputGroup className="arved-input-group">
        <FormattedMessage id="ORCid">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label2"
              type="text"
              name="orcid"
              placeholder={placeholder}
              required
              value={props?.orcid}
              disabled={props?.uneditable ? true : false}
              onChange={handleORCIDChange}

            />
          )}
        </FormattedMessage>
        <AcademicIdIcon />
      </InputGroup>
    </div>

  )
}
export default ORCIDInputGroup
