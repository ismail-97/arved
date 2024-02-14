import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import EmailIcon from '../iconComponents/icons/EmailIcon'

const EmailInputGroup = () => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="email">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="email"
                    name="email"
                    placeholder={placeholder}
                    required
                    />
                }
            </FormattedMessage>
            <EmailIcon />
        </InputGroup>
    )
}
export default EmailInputGroup