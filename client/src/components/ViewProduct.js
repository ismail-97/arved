import translate from '../i18n/messages/translate'
import Modal from 'react-bootstrap/Modal'
import React from 'react'
import DownloadIcon from '../iconComponents/icons/DownloadIcon'
import EditProductIcon from '../iconComponents/icons/EditProductIcon'
import DeleteProductIcon from '../iconComponents/icons/DeleteProductIcon'
import productService from '../services/product'
import { useState } from 'react'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const ViewProduct = (props) => {
  const dispatch = useDispatch()

  const downloadDocument = async (fileId) => {
    if (fileId) await productService.getProductDocument(fileId)
  }
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const navigate = useNavigate()
  const editItem = (product) => {
    dispatch(setNotification(''))

    navigate(`/edit-product`, { state: product })
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="px-5 py-4">
        <div className="view-product-title text-capitalize">
          {props.product.title}
        </div>
        {props.role === 'user' && (
          <div className="d-flex pt-2">
            <button
              className="arved-button2 d-flex ml-auto"
              style={{ color: '#837f13' }}
              onClick={() => editItem(props.product)}
            >
              <EditProductIcon className="mx-1" />
              <span>{translate('edit')}</span>
            </button>

            <button
              className="arved-button2 d-flex"
              style={{ color: '#820a0a' }}
              onClick={() => setDeleteModalShow(true)}
            >
              <DeleteProductIcon className="mx-1" />
              <span>{translate('delete')}</span>
            </button>
          </div>
        )}
        <div className="container mt-3 p-0">
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('authors')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 text-capitalize">
              {props.product.authors.join(', ')}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('productType')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 text-capitalize">
              {translate(props.product.type)}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('publicationDate')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8 pl-3 pl-sm-5">
              {props.product.publication_date}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('publisher')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 text-capitalize">
              {props.product.publisher}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('document')}:
            </div>
            <div
              className="text-capitalize view-product-field-text view-product-field-document col-7 col-sm-8  pl-3 pl-sm-5 "
              onClick={() => downloadDocument(props.product.fileID)}
            >
              {props.product.fileID ? (
                <>
                  <div> {translate('downloadDocument')}:</div>
                  <div>
                    {' '}
                    <DownloadIcon />
                  </div>
                </>
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('link')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 ">
              <a
                href={props.product.url}
                className="view-product-field-document text-capitalize"
              >
                {props.product.url ? translate('productURL') : '-'}
              </a>
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('citations')}:
            </div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5">
              {props.product.citations}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3 ">Indexed:</div>
            <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 ">
              {props.product.sciIndex}
            </div>
          </div>
          <div className="row">
            <div className="view-product-field col-4 col-sm-3">
              {translate('description')}:
            </div>
            {props.product.description && (
              <div className="view-product-field-text col-7 col-sm-8  pl-3 pl-sm-5 ">
                {props.product.description.substr(0, 400)}
              </div>
            )}
          </div>
        </div>
        <div className="d-none">
          <DeleteConfirmationModal
            header={translate('deleteModalHeader')}
            body={translate('deleteModalBody')}
            footer={translate('deleteModalFooter')}
            productid={props.product.id}
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ViewProduct
