import React from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import NameInputGroup from '../inputGroupComponents/NameInputGroup'
import SurnameInputGroup from '../inputGroupComponents/SurnameInputGroup'
import EmailInputGroup from '../inputGroupComponents/EmailInputGroup'
import AcademicTitleInputGroup from '../inputGroupComponents/AcademicTitleInputGroup'
import ORCIDInputGroup from '../inputGroupComponents/ORCIDInputGroup'
import FacultyInputGroup from '../inputGroupComponents/FacultyInputGroup'
import DepartmentInputGroup from '../inputGroupComponents/DepartmentInputGroup'
import FieldsOfStudyInputGroup from '../inputGroupComponents/FieldsOfStudyInputGroup'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

import { editUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditAccount = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const editAccount = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const fields = formData.getAll('studyFields')

    try {
      await dispatch(
        editUser({
          email: event.target.email.value,
          fields: fields,
        })
      )
      navigate('/profile')
    } catch (error) {
      dispatch(setNotification(error.message))
    }
  }

  const cancel = async (event) => {
    event.preventDefault()
    navigate('/profile')
  }
  return (
    <div className="product-page d-flex w-100 justify-content-center">
      <div>
        <div className="form-text">Edit Account</div>
        <Notification time="5000" type="error" />

        <Form
          onSubmit={editAccount}
          className="justify-content-around text-capitalize form py-5 px-sm-3 px-md-5"
        >
          <Container className="d-flex flex-column align-items-center">
            <Row className="w-100 justify-content-between">
              <Col className="col-12 col-md-6">
                <NameInputGroup name={user.name} uneditable={true} />
                <SurnameInputGroup surname={user.surname} uneditable={true} />
                <ORCIDInputGroup orcid={user.orcid} uneditable={true} />
                <EmailInputGroup email={user.email} />
              </Col>
              <Col className="col-12 col-md-6">
                <AcademicTitleInputGroup title={user.title} uneditable={true} />
                <FacultyInputGroup faculty={user.faculty} uneditable={true} />
                <DepartmentInputGroup
                  department={user.department}
                  uneditable={true}
                />
                <FieldsOfStudyInputGroup fields={user.fields} />
              </Col>
            </Row>
            <Row className="mt-3 mb-0 w-50 d-flex justify-content-center">
              <Form.Group className="mx-3">
                <Button type="submit" className="arved-button3">
                  Edit
                </Button>
              </Form.Group>
              <Form.Group className="mx-3">
                <Button
                  type="submit"
                  className="arved-button4"
                  onClick={cancel}
                >
                  cancel
                </Button>
              </Form.Group>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  )
}

export default EditAccount
