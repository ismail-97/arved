import { Form, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ListIcon from '../iconComponents/icons/ListIcon'
import { getAllDepartments } from '../reducers/departmentsReducer'
import { useSelector, useDispatch } from 'react-redux'

const DepartmentInputGroup = (props) => {
  const dispatch = useDispatch()
  const selectedFaculty = useSelector((state) => state.selectedFaculty)

  const getDepartments = () => {
    dispatch(getAllDepartments(selectedFaculty))
  }
  const departments = useSelector((state) => state.departments)

  return (
    <InputGroup className="justify-content-end arved-input-group">
      <FormattedMessage id="department list">
        {(placeholder) => (
          <Form.Select
            className="select-group"
            name="department"
            onClick={getDepartments}
            required
            value={props?.department}
            disabled={props?.uneditable ? true : false}
          >
            {!props?.uneditable && <option>Select a {placeholder}</option>}
            {props?.uneditable && (
              <option value={props?.department} className="bg-light">
                {props?.department}
              </option>
            )}
            {departments.map((department) => (
              <option
                value={department.name}
                key={department._id}
                className="bg-light"
              >
                {department.name}
              </option>
            ))}
          </Form.Select>
        )}
      </FormattedMessage>
      <ListIcon />
    </InputGroup>
  )
}
export default DepartmentInputGroup
