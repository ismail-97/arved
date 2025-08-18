import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import translate from '../i18n/messages/translate'

import NameInputGroup from '../inputGroupComponents/NameInputGroup'
import SurnameInputGroup from '../inputGroupComponents/SurnameInputGroup'
import EmailInputGroup from '../inputGroupComponents/EmailInputGroup'
import Passwords from '../inputGroupComponents/Passwords'
import AcademicTitleInputGroup from '../inputGroupComponents/AcademicTitleInputGroup'
import ORCIDInputGroup from '../inputGroupComponents/ORCIDInputGroup'
import FacultyInputGroup from '../inputGroupComponents/FacultyInputGroup'
import DepartmentInputGroup from '../inputGroupComponents/DepartmentInputGroup'
import FieldsOfStudyInputGroup from '../inputGroupComponents/FieldsOfStudyInputGroup'
import ModalMessage from './ModalMessage'
import Notification from './Notification'

import { registerUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const extractFormData = (form) => {
    const formData = new FormData(form)
    return {
      name: formData.get('name'),
      surname: formData.get('surname'),
      orcid: formData.get('orcid'),
      email: formData.get('email'),
      password: formData.get('password'),
      title: formData.get('academicTitle'),
      faculty: formData.get('faculty'),
      department: formData.get('department'),
      fields: formData.getAll('studyFields'),
    }
  }

  const signUp = async (event) => {
    event.preventDefault()
    setLoading(true)

    const form = event.target

    try {
      const newUser = extractFormData(form)

      await dispatch(registerUser(newUser))
      setLoading(false)

      setModalShow(true)
      setTimeout(() => {
        navigate('/')
      }, 5000)
    } catch (error) {
      setLoading(false)
      dispatch(
        setNotification(
          error.message || 'An error occurred during registration.'
        )
      )
    }
  }

  return (
    <div className="product-page d-flex w-100 justify-content-center">
      <ModalMessage
        show={modalShow}
        onHide={() => setModalShow(true)}
        body={"Your Account is Created Successfully."}
      />
      <div>
        {loading && <div className="spinner"></div>}

        <div className="form-text">{translate('signUp')}</div>
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
                    {translate('signUp')}
                  </Button>
                  <Form.Group className="text-center ">
                    <a href="/">
                      <p className="mt-3 new-account-text ">
                        {' '}
                        {translate('insteadLogin')}
                      </p>
                    </a>
                  </Form.Group>
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
