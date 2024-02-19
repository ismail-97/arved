import ViewProduct from '../components/ViewProduct'
import EditProductIcon from '../iconComponents/icons/EditProductIcon'
import DeleteProductIcon from '../iconComponents/icons/DeleteProductIcon'
import translate from '../i18n/messages/translate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'

const Product = ({ product, role }) => {
  const navigate = useNavigate()

  const editItem = (product) => {
    navigate(`/edit-product`, { state: product })
  }
  const [modalShow, setModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)

  return (
    <tr key={product.id} className="mb-3 product d-flex align-items-center ">
      <td className="d-none">
        <ViewProduct
          role={role}
          product={product}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </td>
      <td className="d-none">
        <DeleteConfirmationModal
          header={translate('deleteModalHeader')}
          body={translate('deleteModalBody')}
          footer={translate('deleteModalFooter')}
          productid={product.id}
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
        />
      </td>
      <td className="product-section ml-3">
        <p className="product-title" onClick={() => setModalShow(true)}>
          {product.title}
        </p>
        <p className="product-author">{product.authors.join(', ')}</p>
        <p className="product-magazine">{product.publisher}</p>
      </td>
      <td className="product-type-year align-items-center">
        <span className="product-type"> {translate(`${product.type}`)}</span>
        <span className="product-year d-none d-sm-flex">
          {' '}
          {product.publication_date}
        </span>
      </td>
      {role === 'user' && (
        <td className="d-flex justify-content-between">
          <button
            className="arved-button2 d-flex align-items-center"
            onClick={() => editItem(product)}
          >
            <EditProductIcon />
          </button>
          <button
            className="arved-button2 d-flex align-items-center"
            onClick={() => setDeleteModalShow(true)}
          >
            <DeleteProductIcon />
          </button>
        </td>
      )}
    </tr>
  )
}

export default Product
