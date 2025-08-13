import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'
import { getAllFaculties } from '../reducers/facultiesReducer'
import { setFaculty } from '../reducers/facultyReducer'

import { useSelector, useDispatch } from 'react-redux'

const FacultyInputGroup = (props) => {
  const dispatch = useDispatch()
  const faculties = useSelector((state) => state.faculties)
  const getFaculties = async () => {
    await dispatch(getAllFaculties())
  }
  const handleChange = (event) => {
    dispatch(setFaculty(event.target.value))
  }
  return (
    <InputGroup className="justify-content-end arved-input-group">
      <FormattedMessage id="chooseFaculty">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="faculty"
            onClick={getFaculties}
            onChange={handleChange}
            required
            value={props?.faculty}
            disabled={props?.uneditable ? true : false}
          >
            {!props?.uneditable && <option>{placeholder}</option>}
            {props?.uneditable && (
              <option value={props?.faculty} className="bg-light">
                {props?.faculty}
              </option>
            )}

            {faculties.map((faculty) => (
              <option
                value={faculty.name}
                key={faculty._id}
                className="bg-light"
              >
                {faculty.name}
              </option>
            ))}
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default FacultyInputGroup
