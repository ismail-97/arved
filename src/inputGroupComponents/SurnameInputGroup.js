import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'

const SurnameInputGroup = (props) => {
  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="Surname">
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="text"
            name="surname"
            placeholder={placeholder}
            required
            value={props?.surname}
            disabled={props?.uneditable ? true : false}
          />
        )}
      </FormattedMessage>
      <AuthorIcon />
    </InputGroup>
  )
}
export default SurnameInputGroup
