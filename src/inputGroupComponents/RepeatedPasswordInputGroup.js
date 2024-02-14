import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import PasswordIcon from '../iconComponents/icons/PasswordIcon'

const RepeatedPasswordInputGroup = () => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="repeatedPassword">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="password"
                    name="repeatedPassword"
                    placeholder={placeholder}
                    required
                    />
                }
                </FormattedMessage>
                <PasswordIcon/>
        </InputGroup>
    )
}
export default RepeatedPasswordInputGroup