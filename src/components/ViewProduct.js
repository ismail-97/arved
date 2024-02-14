
import translate from '../i18n/messages/translate'
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import DownloadIcon from '../iconComponents/icons/DownloadIcon'
import EditProductIcon from '../iconComponents/icons/EditProductIcon'
import DeleteProductIcon from '../iconComponents/icons/DeleteProductIcon'
import productService from '../services/product'
import { useState } from 'react';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import { useNavigate } from "react-router-dom"

const ViewProduct = (props) => { 

    const downloadDocument = async (fileId) => {
        if(fileId)
            await productService.getProductDocument(fileId)
    }
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const navigate = useNavigate()
    const editItem = (product) => {
        navigate(`/edit-product`, { state: product})
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Body className="px-5 py-4" >
                <div className="view-product-title text-capitalize">{props.product.title}</div>
                {props.role === "user" && <div className='d-flex pt-2'>
                    <button
                        className='arved-button2 d-flex ml-auto'
                        style={{ color: "#837f13" }}
                        onClick={() => editItem(props.product)}>
                        <EditProductIcon className='mx-1' />
                        <span>{translate('edit')}</span>
                    </button>

                    <button
                        className='arved-button2 d-flex'
                        style={{ color: "#820a0a" }}
                        onClick={() => setDeleteModalShow(true)}>
                        <DeleteProductIcon className='mx-1' />
                        <span>{translate('delete')}</span>
                    </button>
                </div>}
                <div className='container mt-3'>
                    <div className='row'>
                        <div className='view-product-field col-3'>Authors:</div>
                        <div className='view-product-field-text col-8 text-capitalize'>{props.product.authors.join(', ')}</div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Type of Product:</div>
                        <div className='text-capitalize view-product-field-text col-8'>{props.product.type}</div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Publication Date:</div>
                        <div className='view-product-field-text col-8'>
                            {props.product.publication_date}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Publisher:</div>
                        <div className='text-capitalize view-product-field-text col-8'>{props.product.publisher}</div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Document:</div>                 
                        <div className='text-capitalize view-product-field-text view-product-field-document col-8' onClick={() => downloadDocument(props.product.fileID)}>
                            {props.product.fileID ? 
                                <>
                                    <div> Download Document</div>
                                    <div> <DownloadIcon /></div>   
                                </>    : '-'}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Link:</div>
                        <div className='view-product-field-text col-8 '>
                            <a href={props.product.url} className='view-product-field-document'>{props.product.url ? "Product URL" : '-'}</a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3'>Citations:</div>
                        <div className='view-product-field-text col-8'>{props.product.citations}</div>
                    </div>
                    <div className='row'>
                        <div className='view-product-field col-3 '>Indexed:</div>
                        <div className='view-product-field-text col-8'>{props.product.sciIndex}</div>
                    </div>
                    <div className='row' >
                        <div className='view-product-field col-3'>Description:</div>
                            {props.product.description &&
                                    <div className='view-product-field-text col-8'>
                                        {props.product.description.substr(0, 400)}
                                    </div>
                            }
                    </div>
                </div>
                <div className='d-none'>
                    <DeleteConfirmationModal
                        header={translate("deleteModalHeader")}
                        body={translate("deleteModalBody")}
                        footer={translate("deleteModalFooter")}
                        productid={props.product.id}
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)} />
                </div>
            </Modal.Body>
        </Modal>            
    )
}

export default ViewProduct