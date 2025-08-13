import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import PublisherIcon from '../iconComponents/icons/PublisherIcon'

const PublisherInputGroup = ({defaultValue}) => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="publisher">
                { placeholder => <Form.Control
                    className="arved-input-label2"               
                    type="text"
                    name="publisher"
                    defaultValue={defaultValue? defaultValue : ''}
                    placeholder={placeholder}
                    />}
            </FormattedMessage>
            <PublisherIcon/>
        </InputGroup>
    )
}
export default PublisherInputGroup