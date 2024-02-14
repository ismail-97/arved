import { Form, InputGroup} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'
import { getAllFaculties } from '../reducers/facultiesReducer'
import { setFaculty } from '../reducers/facultyReducer'

import { useSelector, useDispatch } from 'react-redux'


const FacultyInputGroup = () => {
    const dispatch = useDispatch()
    const faculties = useSelector(state => state.faculties)
    const getFaculties = () => {
        dispatch(getAllFaculties())
    }
    const handleChange = (event) => {
        dispatch(setFaculty(event.target.value))
    }
    return (
        <InputGroup className="justify-content-end arved-input-group">
            <FormattedMessage id="faculty list" >
                {placeholder =>
                    <Form.Select
                        className="select-group"
                        name="faculty"
                        onClick={getFaculties}
                        onChange={handleChange}
                        required
                    >
                    <option>Select a {placeholder}</option>
                    {faculties.map((faculty) => <option value={faculty.name} key={faculty._id} className="bg-light">{faculty.name}</option>)}
                </Form.Select>
                }
            </FormattedMessage>
            <ListIcon />
        </InputGroup>  
    )
}
export default FacultyInputGroup