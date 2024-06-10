import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'
import AddIcon from '../iconComponents/icons/AddIcon'
import RemoveIcon from '../iconComponents/icons/RemoveIcon'
import { v4 as uuidv4 } from 'uuid'

const FieldsOfStudyInputGroup = (props) => {
  const [fields, setFields] = useState(
    props.fields
      ? props.fields.map((field) => ({ id: uuidv4(), value: field }))
      : [{ id: uuidv4(), value: '' }]
  )

  const addField = () => {
    setFields([...fields, { id: uuidv4(), value: '' }])
  }

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const handleFieldChange = (id, value) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    )
  }

  return (
    <div>
      <InputGroup className="arved-input-group">
        <button type="button" className="no-style" onClick={addField}>
          <AddIcon />
        </button>
        <FormattedMessage id="studyField">
          {(placeholder) => (
            <Form.Control
              className="arved-input-label2 label-with-2-icons"
              type="text"
              name="studyFields"
              placeholder={placeholder}
              required
              value={fields[0]?.value || ''}
              onChange={(e) => handleFieldChange(fields[0]?.id, e.target.value)}
            />
          )}
        </FormattedMessage>
        <ListIcon />
      </InputGroup>

      <OtherFields
        fields={fields.slice(1)}
        deleteField={deleteField}
        handleFieldChange={handleFieldChange}
      />
    </div>
  )
}

const OtherFields = ({ fields, deleteField, handleFieldChange }) => {
  return (
    <div>
      {fields.map(({ id, value }) => (
        <InputGroup className="arved-input-group" key={id}>
          <button
            type="button"
            className="no-style"
            onClick={() => deleteField(id)}
          >
            <RemoveIcon />
          </button>
          <FormattedMessage id="studyField">
            {(placeholder) => (
              <Form.Control
                className="arved-input-label2 label-with-2-icons"
                type="text"
                name="studyFields"
                placeholder={placeholder}
                required
                value={value}
                onChange={(e) => handleFieldChange(id, e.target.value)}
              />
            )}
          </FormattedMessage>
          <ListIcon />
        </InputGroup>
      ))}
    </div>
  )
}

export default FieldsOfStudyInputGroup
