import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'

const SurameInputGroup = () => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="Surname">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="text"
                    name="surname"
                    placeholder={placeholder}
                    required
                    />
                }
            </FormattedMessage>
            <AuthorIcon/>
        </InputGroup>
    )
}
export default SurameInputGroup