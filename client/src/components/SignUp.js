import React, { useState } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import translate from '../i18n/messages/translate'

import NameInputGroup from '../inputGroupComponents/NameInputGroup'
import SurnameInputGroup from '../inputGroupComponents/SurnameInputGroup'
import EmailInputGroup from '../inputGroupComponents/EmailInputGroup'
import PasswordInputGroup from '../inputGroupComponents/PasswordInputGroup'
import RepeatedPasswordInputGroup from '../inputGroupComponents/RepeatedPasswordInputGroup'
import Passwords from '../inputGroupComponents/Passwords'
import AcademicTitleInputGroup from '../inputGroupComponents/AcademicTitleInputGroup'
import ORCIDInputGroup from '../inputGroupComponents/ORCIDInputGroup'
import FacultyInputGroup from '../inputGroupComponents/FacultyInputGroup'
import DepartmentInputGroup from '../inputGroupComponents/DepartmentInputGroup'
import FieldsOfStudyInputGroup from '../inputGroupComponents/FieldsOfStudyInputGroup'
import ModalMessage from '../components/ModalMessage'
import Notification from './Notification'

import { registerUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)

  const signUp = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const fields = formData.getAll('studyFields')

    try {
      await dispatch(
        registerUser({
          name: event.target.name.value,
          surname: event.target.surname.value,
          orcid: event.target.orcid.value,
          email: event.target.email.value,
          password: event.target.password.value,
          title: event.target.academicTitle.value,
          faculty: event.target.faculty.value,
          department: event.target.department.value,
          fields: fields,
        })
      )
      setModalShow(true)
      setTimeout(() => {
        navigate('/')
      }, 5000)
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.message))
    }
  }
  return (
    <div className="product-page d-flex w-100 justify-content-center">
      <ModalMessage
        show={modalShow}
        onHide={() => setModalShow(true)}
        header={translate('pendingModalHeader')}
        body={translate('pendingModalBody')}
        footer={translate('pendingModalFooter')}
        footertype="sentence"
        button="Log Out"
      />
      <div>
        <div className="form-text">Sign Up</div>
        <Notification time="5000" type="error" />

        <Form
          onSubmit={signUp}
          className="justify-content-around text-capitalize form py-5 px-sm-3 px-md-5"
        >
          <Container className="d-flex flex-column align-items-center">
            <Row className="w-100 justify-content-between">
              <Col className="col-12 col-md-6">
                <NameInputGroup />
                <SurnameInputGroup />
                <ORCIDInputGroup />
                <EmailInputGroup />
                <Passwords />
              </Col>
              <Col className="col-12 col-md-6">
                <AcademicTitleInputGroup />
                <FacultyInputGroup />
                <DepartmentInputGroup />
                <FieldsOfStudyInputGroup />
                <Form.Group className="text-center">
                  <Button type="submit" className="arved-button text-center">
                    Sign Up
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
