import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'

const TypeInputGroup = ({ defaultValue, isRequired, allowAll }) => {
  const intl = useIntl()

  return (
    <InputGroup className="justify-content-end arved-input-group">
      <FormattedMessage id="type of academic product">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="type"
            defaultValue={defaultValue ? defaultValue : ''}
            required={isRequired === false ? false : true}
          >
            {allowAll && (
              <option value="All" className="bg-light">
                {intl.formatMessage({ id: 'All' })}
              </option>
            )}
            <option value="project" className="bg-light">
              {intl.formatMessage({ id: 'project' })}
            </option>
            <option value="article" className="bg-light">
              {intl.formatMessage({ id: 'article' })}
            </option>
            <option value="conference paper" className="bg-light">
              {intl.formatMessage({ id: 'conference paper' })}
            </option>
            <option value="book chapter" className="bg-light">
              {intl.formatMessage({ id: 'book chapter' })}
            </option>
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default TypeInputGroup
