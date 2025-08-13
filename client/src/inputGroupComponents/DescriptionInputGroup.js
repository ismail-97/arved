import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'


const DescriptionInputGroup = ({defaultValue}) => {
    return (
        <InputGroup className="mb-4 d-flex flex-row-reverse align-items-center">
            <FormattedMessage id="description of the academic product">
                { placeholder => <Form.Control as="textarea" rows={5}
                    className= ""
                    name="description"
                    placeholder={placeholder}
                    required
                    defaultValue={defaultValue? defaultValue : ''}

                    />}
            </FormattedMessage>
        </InputGroup>          
    )
}

export default DescriptionInputGroup