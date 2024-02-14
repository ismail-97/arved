import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import AcademicIdIcon from '../iconComponents/icons/AcademicIdIcon'

const AcademicIdInputGroup = () => {
    return (
        <InputGroup className="arved-input-group">
            <FormattedMessage id="Academic ID">
                { placeholder => <Form.Control
                    className= "arved-input-label2"
                    type="text"
                    name="AcademicID"
                    placeholder={placeholder}
                    required
                    />
                }
            </FormattedMessage >
            <AcademicIdIcon />
        </InputGroup>
    )
}
export default AcademicIdInputGroup