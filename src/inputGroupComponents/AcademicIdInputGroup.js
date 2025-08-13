import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AcademicIdIcon from '../iconComponents/icons/AcademicIdIcon'

const AcademicIdInputGroup = (props) => {
  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="Academic ID">
        {(placeholder) => (
          <Form.Control
            className="arved-input-label2"
            type="text"
            name="AcademicID"
            placeholder={placeholder}
            required
            value={props?.title}
            readOnly={props?.uneditable ? true : false}
          />
        )}
      </FormattedMessage>
      <AcademicIdIcon />
    </InputGroup>
  )
}
export default AcademicIdInputGroup
