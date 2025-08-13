import productService from '../services/product'

const products = {
  searchResult: [],
  userProducts: [],
}

const productReducer = (state = products, action) => {
  switch (action.type) {
    case 'ALL_PRODUCTS':
      return {
        ...products,
        userProducts: [...action.data],
      }
    case 'RESULTED_PRODUCTS':
      return {
        ...products,
        searchResult: [...action.data],
      }
    case 'NEW_PRODUCT':
      return {
        ...products,
        userProducts: state.userProducts.concat(action.data),
      }
    case 'DELETE_PRODUCT':
      const newProducts = state.userProducts.filter(
        (product) => product.id !== action.data
      )
      return {
        ...products,
        userProducts: newProducts,
      }
    default:
      return state
  }
}

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const products = await productService.getProducts()
      dispatch({
        type: 'ALL_PRODUCTS',
        data: products,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const searchForProducts = (criteria) => {
  return async (dispatch) => {
    try {
      const products = await productService.searchProducts(criteria)
      dispatch({
        type: 'RESULTED_PRODUCTS',
        data: products,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const addNewProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const product = await productService.addProduct(newProduct)
      dispatch({
        type: 'NEW_PRODUCT',
        data: product,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const editProduct = (editedProduct, productId) => {
  return async (dispatch) => {
    try {
      await productService.editProduct(editedProduct, productId)
      const products = await productService.getProducts()
      dispatch({
        type: 'ALL_PRODUCTS',
        data: products,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      await productService.deleteAProduct(productId)
      dispatch({
        type: 'DELETE_PRODUCT',
        data: productId,
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}

export default productReducer
