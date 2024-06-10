import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'

const NameInputGroup = (props) => {
  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="Name">
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="text"
            name="name"
            placeholder={placeholder}
            required
            value={props?.name}
            disabled={props?.uneditable ? true : false}
          />
        )}
      </FormattedMessage>
      <AuthorIcon />
    </InputGroup>
  )
}
export default NameInputGroup
