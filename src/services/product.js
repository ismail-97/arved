import axios from 'axios'
import { getToken } from '../services/token'
import { saveAs } from 'filesaver.js-npm'
const FormData = require('form-data')

const baseUrl = '/user/products'

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}
const getProductsReport = async (products) => {
  const response = axios
    .post(`/admin/filter/create-pdf`, products, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: getToken(),
        Accept: 'application/pdf',
      },
    })
    .then((response) => {
      saveAs(
        new Blob([response.data], { type: 'application/pdf' }),
        'report.pdf'
      )
    })
  return response.data
}
const getProductDocument = async (fileId) => {
  const response = axios
    .get(`${baseUrl}/files/${fileId}`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: getToken(),
        Accept: 'application/pdf',
      },
    })
    .then((response) => {
      console.log(response)
      saveAs(
        new Blob([response.data], { type: 'application/pdf' }),
        `${response.headers['content-disposition']}`
      )
    })

  return response.data
}

const appendToFormData = (formData, product) => {
  formData.append('file', product.file)
  formData.append('title', product.title)
  formData.append('type', product.type)
  formData.append('authors', product.authors)
  formData.append('publication_date', product.publication_date)
  formData.append('publisher', product.publisher)
  formData.append('url', product.url)
  formData.append('citations', product.citations)
  formData.append('description', product.description)
  formData.append('sciIndex', product.sciIndex)
}

const addProduct = async (newProduct) => {
  const formData = new FormData()
  appendToFormData(formData, newProduct)

  const response = await axios.post(`${baseUrl}`, formData, {
    headers: {
      Authorization: getToken(),
      'content-type': 'multipart/form-data',
    },
  })
  return response.data
}

const editProduct = async (editedProduct, productId) => {
  const formData = new FormData()
  appendToFormData(formData, editedProduct)

  const response = await axios.put(`${baseUrl}/${productId}`, formData, {
    headers: {
      Authorization: getToken(),
      'content-type': 'multipart/form-data',
    },
  })
  return response.data
}

const deleteAProduct = async (productId) => {
  const response = await axios.delete(`${baseUrl}/${productId}`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const searchProducts = async (criteria) => {
  const response = await axios.post(`/admin/filter`, criteria, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const productService = {
  getProducts,
  getProductDocument,
  addProduct,
  deleteAProduct,
  searchProducts,
  getProductsReport,
  editProduct,
}
export default productService
