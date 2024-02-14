import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import TitleIcon from '../iconComponents/icons/TitleIcon'

const TitleInputGroup = ({defaultValue}) => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="title" className="">
                { placeholder => <Form.Control
                    className="arved-input-label2 text-capitalize"
                    type="text"
                    name="title"
                    placeholder={placeholder}
                    defaultValue={defaultValue? defaultValue : ''}
                />
                }
            </FormattedMessage>
            <TitleIcon/>
        </InputGroup>
    )
}
export default TitleInputGroup