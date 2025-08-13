import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import CitationsIcon from '../iconComponents/icons/CitationsIcon'

const CitationsInputGroup = ({ name, id, defaultValue, isRequired }) => {
  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id={id}>
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="number"
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue : ''}
            required={isRequired === false ? false : true}
          />
        )}
      </FormattedMessage>
      <CitationsIcon />
    </InputGroup>
  )
}

export default CitationsInputGroup
