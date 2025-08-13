import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'

import ListIcon from '../iconComponents/icons/ListIcon'

const AcademicTitleInputGroup = (props) => {
  const intl = useIntl()

  return (
    <InputGroup className="arved-input-group">
      <FormattedMessage id="academic title list">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="academicTitle"
            required
            value={props?.title}
            disabled={props?.uneditable ? true : false}
          >
            {!props?.uneditable && <option>{placeholder}</option>}
            <option value="Prof. Dr." className="bg-light">
              {intl.formatMessage({ id: 'Prof. Dr.' })}
            </option>
            <option value="Assoc. Prof. Dr." className="bg-light">
              {intl.formatMessage({ id: 'Assoc. Prof. Dr.' })}
            </option>
            <option value="Assist. Prof. Dr." className="bg-light">
              {intl.formatMessage({ id: 'Assist. Prof. Dr.' })}
            </option>
            <option value="Dr." className="bg-light">
              {intl.formatMessage({ id: 'Dr.' })}
            </option>
            <option value="Inst." className="bg-light">
              {intl.formatMessage({ id: 'Inst.' })}
            </option>
            <option value="Res. Assist." className="bg-light">
              {intl.formatMessage({ id: 'Res. Assist.' })}
            </option>
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default AcademicTitleInputGroup
