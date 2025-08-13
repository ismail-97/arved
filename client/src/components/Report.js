import React, { useState } from 'react'
import Pages from '../components/Pages'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import TitleInputGroup from '../inputGroupComponents/TitleInputGroup'
import TypeInputGroup from '../inputGroupComponents/TypeInputGroup'
import AuthorsInputGroup from '../inputGroupComponents/AuthorsInputGroup'
import DateInputGroup from '../inputGroupComponents/DateInputGroup'
import PublisherInputGroup from '../inputGroupComponents/PublisherInputGroup'
import CitationsInputGroup from '../inputGroupComponents/CitationsInputGroup'
import { searchForProducts } from '../reducers/productReducer'
import translate from '../i18n/messages/translate'
import ProductTable from './ProductTable'
import productService from '../services/product'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const SearchForm = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.searchResult)

  const createPDF = async () => {
    setLoading(true)
    try {
      await productService.getProductsReport(products)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(setNotification(error.message))
    }
  }

  const searchProducts = async (event) => {
    setLoading(true)

    event.preventDefault()

    const formData = new FormData(event.target)
    const authors = formData.getAll('authors')
    const title = event.target.title.value
    const type = event.target.type.value
    const publisher = event.target.publisher.value
    const citationsMoreThan = event.target.moreThanCitations.value
    const citationsLessThan = event.target.lessThanCitations.value
    const dateAfter = event.target.dateAfter.value
    const dateBefore = event.target.dateBefore.value
    try {
      await dispatch(
        searchForProducts({
          title,
          type,
          authors,
          publisher,
          citationsMoreThan,
          citationsLessThan,
          dateAfter,
          dateBefore,
        })
      )
      setLoading(false)
    } catch (error) {
      setLoading(false)

      dispatch(setNotification(error.message))
    }
  }

  return (
    <div>
      {loading && <div className="spinner"></div>}
      <div className="product-page m-auto">
        <div className="form-text mb-2"> {translate('searchNoun')}</div>
        <Notification time="5000" type="error" />

        <Form
          onSubmit={searchProducts}
          className="justify-content-around text-capitalize form mb-3 py-5 px-sm-3 px-lg-5"
        >
          <Container className="d-flex flex-column align-items-center">
            <Row className="w-100 justify-content-between">
              <Col className="col-12 col-md-6">
                <TitleInputGroup isRequired={false} />
                <TypeInputGroup isRequired={false} allowAll={true} />
                <AuthorsInputGroup isRequired={false} />
                <PublisherInputGroup isRequired={false} />
              </Col>
              <Col className="col-12 col-md-6">
                <CitationsInputGroup
                  name="moreThanCitations"
                  id={'moreThanCitations'}
                  isRequired={false}
                />
                <CitationsInputGroup
                  name="lessThanCitations"
                  id={'lessThanCitations'}
                  isRequired={false}
                />
                <DateInputGroup
                  name="dateAfter"
                  id={'DateAfter'}
                  isRequired={false}
                />
                <DateInputGroup
                  name="dateBefore"
                  id={'DateBefore'}
                  isRequired={false}
                />
              </Col>
            </Row>
            <Row className="mt-3 mb-0 w-50 d-flex justify-content-center">
              <Form.Group className="mx-3">
                <Button type="submit" className="arved-button3 text-capitalize">
                  {translate('search')}
                </Button>
              </Form.Group>
            </Row>
          </Container>
        </Form>
      </div>
      <div className="w-100 text-center my-4">
        <button
          onClick={createPDF}
          className="download-result field-18-bold-arial"
        >
          {translate('downloadReport')}
        </button>
      </div>
      <ProductTable products={products} role="admin" />
    </div>
  )
}
const Report = () => {
  return (
    <div className="content text-capitalize">
      <Pages />
      <div className="page-title-text text-center mt-2 mb-0">
        {translate('creatingReport')}
      </div>
      <SearchForm />
    </div>
  )
}

export default Report
