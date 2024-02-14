import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AuthorIcon from '../iconComponents/icons/AuthorIcon'

const NameInputGroup = () => {
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="Name">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="text"
                    name="name"
                    placeholder={placeholder}
                    required
                    onChange={handleChange}
                    />
                }
            </FormattedMessage>
            <AuthorIcon />
        </InputGroup>
    )
}
export default NameInputGroup