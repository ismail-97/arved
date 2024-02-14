import React, { useState } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import translate from '../i18n/messages/translate'
import { FormattedMessage } from 'react-intl'

import NameInputGroup from '../inputGroupComponents/NameInputGroup'
import SurnameInputGroup from '../inputGroupComponents/SurnameInputGroup'
import AcademicIdInputGroup from '../inputGroupComponents/AcademicIdInputGroup'
import EmailInputGroup from '../inputGroupComponents/EmailInputGroup'
import PasswordInputGroup from '../inputGroupComponents/PasswordInputGroup'
import RepeatedPasswordInputGroup from '../inputGroupComponents/RepeatedPasswordInputGroup'
import AcademicTitleInputGroup from '../inputGroupComponents/AcademicTitleInputGroup'
import ORCIDInputGroup from '../inputGroupComponents/ORCIDInputGroup'
import FacultyInputGroup from '../inputGroupComponents/FacultyInputGroup'
import DepartmentInputGroup from '../inputGroupComponents/DepartmentInputGroup'
import FieldsOfStudyInputGroup from '../inputGroupComponents/FieldsOfStudyInputGroup'
import ModalMessage from '../components/ModalMessage'

import { registerUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)

  const signUp = async (event) => {
    event.preventDefault()
    const fields = []
    Array.from(event.target.studyFields).map((input) =>
      fields.push(input.value)
    )

    try {
      await dispatch(
        registerUser({
          name: event.target.name.value,
          surname: event.target.surname.value,
          orcid: event.target.orcid.value,
          // academicId: event.target.AcademicID.value,
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
      console.log('error in sign up')
    }
  }
  return (
    <div className="product-page d-flex w-100 justify-content-center">
      <ModalMessage
        // show={modalShow}
        // onHide={() => setModalShow(true)}
        // header={translate("successfullRegisterationHeader")}
        // body={translate("successfullRegisterationBody")}
        // footer={translate("successfullRegisterationFooter")}
        // footertype='sentence'
        // button=''
        show={modalShow}
        onHide={() => setModalShow(true)}
        header={translate('pendingModalHeader')}
        body={translate('pendingModalBody')}
        footer={translate('pendingModalFooter')}
        footertype="sentence"
        button="Log Out"
      />
      <div>
        <div className="product-text">Sign Up</div>
        <Form
          onSubmit={signUp}
          className="justify-content-around text-capitalize product-form p-5"
        >
          <Container className="d-flex flex-column align-items-center">
            <Row className="w-100 justify-content-between">
              <Col className="col-6">
                <NameInputGroup />
                <SurnameInputGroup />
                {/* <AcademicIdInputGroup /> */}
                <ORCIDInputGroup />
                <EmailInputGroup />
                <PasswordInputGroup />
                <RepeatedPasswordInputGroup />
              </Col>
              <Col className="col-6">
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
