import React, { Component, useEffect } from 'react'
import Product from './Product'
import { Table } from 'react-bootstrap'
import EditProductIcon from '../iconComponents/icons/EditProductIcon'
import DeleteProductIcon from '../iconComponents/icons/DeleteProductIcon'
import translate from '../i18n/messages/translate'


const ProductTable = ({ products, role}) => {
    return (
        <div>
            <Table className='d-flex flex-column'>
                <thead className='d-flex  mb-3 product-bar'>
                    <tr className='d-flex align-items-center w-100'>
                        <th className='product-section ml-3'>{translate(`product`)}</th>
                        <th className='product-type-year d-flex'>
                            <span className='product-type'> {translate(`type`)}</span>
                            <span className='product-year'> {translate(`year`)}</span>
                        </th>
                        { role === "user" && 
                            <th className='d-flex hidden'>                                
                                <button className='d-flex align-items-center'>
                                    <EditProductIcon/>
                                </button>
                                <button className=' d-flex align-items-center'>
                                    <DeleteProductIcon />
                                </button>
                            </th>
                        }
                    </tr>
                </thead>
                <tbody className='products text-capitalize'>
                    {products !== [] ?
                        products.map(product => <Product key={product.id} product={product} role={role} />)
                        : null
                    }
                </tbody>
            </Table>
        </div>

    )
}


export default ProductTable