import React, { useState } from 'react'
import translate from '../i18n/messages/translate'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import FileUploadIcon from '../iconComponents/icons/FileUploadIcon'
import DocumentIcon from '../iconComponents/icons/DocumentIcon'

import TitleInputGroup from '../inputGroupComponents/TitleInputGroup'
import TypeInputGroup from '../inputGroupComponents/TypeInputGroup'
import IndexInputGroup from '../inputGroupComponents/IndexInputGroup'
import AuthorsInputGroup from '../inputGroupComponents/AuthorsInputGroup'
import DateInputGroup from '../inputGroupComponents/DateInputGroup'
import PublisherInputGroup from '../inputGroupComponents/PublisherInputGroup'
import LinkInputGroup from '../inputGroupComponents/LinkInputGroup'
import CitationsInputGroup from '../inputGroupComponents/CitationsInputGroup'
import DescriptionInputGroup from '../inputGroupComponents/DescriptionInputGroup'
import { addNewProduct } from '../reducers/productReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [uploadedFile, setFile] = useState('')
  const onChangeFile = (event) => {
    setFile(event.target.files[0])
  }

  const addItem = async (event) => {
    event.preventDefault()
    let authors = []
    Array.from(event.target.authors).map((input) => {
      authors = authors.concat(input.value)
      return authors
    })
    console.log(event.target.sciIndex.value)
    try {
      await dispatch(
        addNewProduct({
          title: event.target.title.value,
          type: event.target.type.value,
          authors:
            event.target.authors.length === undefined
              ? authors.concat(event.target.authors.value)
              : authors,
          publication_date: event.target.publication_date.value,
          publisher: event.target.publisher.value,
          file: uploadedFile,
          url: event.target.url.value,
          citations: event.target.citations.value,
          description: event.target.description.value,
          sciIndex: event.target.sciIndex.value,
        })
      )
      dispatch(setNotification('Product Added Successfully'))
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }
  const cancelAdding = async (event) => {
    event.preventDefault()
    navigate('/profile')
  }

  return (
    <div className="product-page">
      <div className="form-text">Add An Academic Product</div>
      <Form
        onSubmit={addItem}
        className="justify-content-around text-capitalize form py-4 px-sm-3 px-md-5"
      >
        <Container className="d-flex flex-column align-items-center">
          <Row className="w-100 justify-content-between">
            <Col className="col-12 col-md-6">
              <TitleInputGroup />
              <TypeInputGroup />
              <AuthorsInputGroup iconsNo={1} />
              <DateInputGroup name="publication_date" id={'publication date'} />
              <PublisherInputGroup />
              <IndexInputGroup />
            </Col>
            <Col className="col-12 col-md-6">
              <LinkInputGroup />
              <CitationsInputGroup name="citations" id={'citations'} />
              <InputGroup className="arved-input-group">
                <FileUploadIcon />
                <FormattedMessage id="document">
                  {(placeholder) => (
                    <Form.Control
                      className="arved-input-label2 label-with-2-icons"
                      type="file"
                      name="file"
                      onChange={(event) => onChangeFile(event)}
                      placeholder={placeholder}
                      title=" "
                    />
                  )}
                </FormattedMessage>
                <DocumentIcon />
              </InputGroup>
              <DescriptionInputGroup />
            </Col>
          </Row>
          <Row className="mt-3 mb-0 w-50 d-flex justify-content-center">
            <Form.Group className="mx-3">
              <Button type="submit" className="arved-button3">
                {translate('add')}
              </Button>
            </Form.Group>
            <Form.Group className="mx-3">
              <Button
                type="submit"
                className="arved-button4"
                onClick={cancelAdding}
              >
                {translate('cancel')}
              </Button>
            </Form.Group>
          </Row>
        </Container>
      </Form>
    </div>
  )
}
export default AddProduct
