import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'

const IndexInputGroup = ({ defaultValue }) => {
  return (
    <InputGroup className="justify-content-end arved-input-group">
      <FormattedMessage id="indexType">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="sciIndex"
            required
            defaultValue={defaultValue ? defaultValue : ''}
          >
            <option value="SCI" className="bg-light">
              SCI
            </option>
            <option value="SCIE" className="bg-light">
              SCIE
            </option>
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default IndexInputGroup
