import React, { useEffect } from 'react'
import AddProductIcon from '../iconComponents/icons/AddIcon'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../reducers/productReducer'
import { useNavigate } from 'react-router-dom'
import translate from '../i18n/messages/translate'
import ProductTable from './ProductTable'
import Notification from '../components/Notification'

const Products = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  const products = useSelector((state) => state.products.userProducts)

  return (
    <div>
      <div className="d-flex justify-content-end my-3 p-0 pr-sm-3">
        <button
          className="arved-button2 d-flex align-items-center"
          style={{ backgroundColor: 'transparent' }}
          onClick={() => navigate('/add-product')}
        >
          <AddProductIcon className="mx-1" />
          <span>{translate(`add-a-product`)}</span>
        </button>
      </div>
      <Notification />
      <ProductTable products={products} role="user" />
    </div>
  )
}

export default Products
