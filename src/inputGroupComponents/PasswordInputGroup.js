import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import PasswordIcon from '../iconComponents/icons/PasswordIcon'

const PasswordInputGroup = () => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="password">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="password"
                    name="password"
                    placeholder={placeholder}
                    required
                    />
                }
                </FormattedMessage>
                <PasswordIcon/>
        </InputGroup>
    )
}
export default PasswordInputGroup