import React, { useEffect } from 'react'
import Pages from '../components/Pages'
import ProfilePicrtureSmall from '../iconComponents/icons/ProfilePicrtureSmall'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentAccounts } from '../reducers/adminReducer'
import Products from './Products'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap'
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

const SearchForm = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.searchResult)
    const createPDF = async () => {
        await productService.getProductsReport(products)

    }
    const searchProducts = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const type = event.target.type.value
        const authors = event.target.authors.value
        const publisher = event.target.publisher.value
        const citationsMoreThan = event.target.moreThanCitations.value
        const citationsLessThan = event.target.lessThanCitations.value
        const dateAfter = event.target.dateAfter.value
        const dateBefore = event.target.dateBefore.value
        try{
            dispatch(searchForProducts(
                {
                    title,
                    type,
                    authors,
                    publisher,
                    citationsMoreThan,
                    citationsLessThan,
                    dateAfter,
                    dateBefore
                }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='w-75 m-auto'>
                <div className='product-text mb-2 ml-4' style={{ fontSize: 30 }}>search</div>            
                <Form onSubmit={searchProducts} className="justify-content-around text-capitalize product-form p-5 mb-3">
                    <Container className="d-flex flex-column align-items-center">
                        <Row className="w-100 justify-content-between">
                            <Col className="col-6">
                                <TitleInputGroup isRequired={"required"}/>
                                <TypeInputGroup/>
                                <AuthorsInputGroup iconsNo={2} />
                                <PublisherInputGroup/>
                            </Col>
                            <Col className="col-6">
                                <CitationsInputGroup name="moreThanCitations" id={"moreThanCitations"}/>
                                <CitationsInputGroup name="lessThanCitations" id={"lessThanCitations"} />
                                <DateInputGroup name="dateAfter" id={"DateAfter"}/>
                                <DateInputGroup name="dateBefore" id={"DateBefore"}/>
                            </Col>
                        </Row >
                        <Row className="mt-3 mb-0 w-50 d-flex justify-content-center">
                            <Form.Group className="mx-3">
                                <Button type="submit" className ="arved-button3">
                                    Search
                                </Button>
                            </Form.Group>
                        </Row>
                    </Container>    
                </Form>
            </div>
            <div className='w-100 text-center my-4'>
                <button
                    onClick={createPDF}
                    className="download-result field-18-bold-arial">Download A Report Of All Results</button>

            </div>
            <ProductTable products={products} role="admin"/>
        </div>
    )
}
const Report = () => {
    return (
        <div className='content text-capitalize'>
            <Pages />
            <div className='product-text text-center mt-2 mb-0' style={{ fontSize: 42 }}>creating a report</div>
            <SearchForm />
        </div>
    )
}

export default Report