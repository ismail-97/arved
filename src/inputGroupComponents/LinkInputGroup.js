import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import LinkIcon from '../iconComponents/icons/LinkIcon'

const LinkInputGroup = ({defaultValue}) => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="URL">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="url"
                    name="url"
                    placeholder={placeholder}
                    required
                    defaultValue={defaultValue? defaultValue : ''}

                    />
                }
            </FormattedMessage>
            <LinkIcon />
        </InputGroup>
    )
}
export default LinkInputGroup