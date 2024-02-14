import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'

const AcademicTitleInputGroup = () => {
    return (
    <InputGroup className="arved-input-group" >
            <FormattedMessage id="academic title list">
                {placeholder =>
                    <Form.Select className="select-group" name="academicTitle" required>
                        <option>{placeholder}</option>
                        <option value='Prof. Dr.' className="bg-light">Prof. Dr.</option>
                        <option value="Assoc. Prof. Dr." className="bg-light">Assoc. Prof. Dr.</option>
                        <option value="Assist. Prof. Dr." className="bg-light">Assist. Prof. Dr.</option>
                        <option value="Dr." className="bg-light">Dr.</option>
                        <option value="Inst." className="bg-light">Inst.</option>
                        <option value="Res. Assist." className="bg-light">Res. Assist.</option>
                    </Form.Select>
                }
                
            </FormattedMessage>
            <ListIcon />
    </InputGroup>  
    )
}
export default AcademicTitleInputGroup