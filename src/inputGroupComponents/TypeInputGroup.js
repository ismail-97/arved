import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'

const TypeInputGroup = ({ defaultValue }) => {
  return (
    <InputGroup className="justify-content-end arved-input-group">
      <FormattedMessage id="type of academic product">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="type"
            required
            defaultValue={defaultValue ? defaultValue : ''}
          >
            <option value="project" className="bg-light">
              project
            </option>
            <option value="article" className="bg-light">
              article
            </option>
            <option value="conference paper" className="bg-light">
              conference paper
            </option>
            <option value="book chapter" className="bg-light">
              book chapter
            </option>
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default TypeInputGroup
