import DateIcon from '../iconComponents/icons/DateIcon'
import DatePickerIcon from '../iconComponents/icons/DatePickerIcon'
import { FormattedMessage } from 'react-intl'

import { Form, InputGroup} from 'react-bootstrap'

const DateInputGroup = ({name, id, defaultValue}) => {
    return (
        <InputGroup className="arved-input-group">
            <DatePickerIcon/>
            <FormattedMessage id={id}>
                { placeholder => <Form.Control
                    className= "arved-input-label2 label-with-2-icons"
                    type="number"
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue? defaultValue : ''}

                    />
                }
            </FormattedMessage>            
            <DateIcon />
        </InputGroup>
    )
}

export default DateInputGroup