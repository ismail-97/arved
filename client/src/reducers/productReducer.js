import productService from '../services/product'

const products = {
    searchResult: [],
    userProducts: []
}

const productReducer = (state = products, action) => {
    switch (action.type){
        case 'ALL_PRODUCTS':
            return {
                ...products,
                userProducts: [...action.data]
            }
        case 'RESULTED_PRODUCTS':
            return {
                ...products,
                searchResult: [...action.data]
            }
        case 'NEW_PRODUCT':
            return {
                ...products,
                userProducts : state.userProducts.concat(action.data)
            }
        case 'DELETE_PRODUCT':
            const newProducts = state.userProducts.filter(product => product.id !== action.data)
            return {
                ...products,
                userProducts : newProducts
            }
        default: return state
    }
}

export const getAllProducts = () => {
    return async dispatch => {
        const products = await productService.getProducts()
        dispatch ({
            type: 'ALL_PRODUCTS',
            data: products
        })
    }
}

export const searchForProducts = (criteria) => {
    return async dispatch => {
        const products = await productService.searchProducts(criteria)
        dispatch ({
            type: 'RESULTED_PRODUCTS',
            data: products
        })
    }
}

export const addNewProduct = (newProduct) => {
    return async dispatch => {
        const product = await productService.addProduct(newProduct)
        dispatch ({
            type: 'NEW_PRODUCT',
            data: product
        })
    }
}

export const editProduct = (editedProduct, productId) => {
    return async dispatch => {
        await productService.editProduct(editedProduct, productId)
        const products = await productService.getProducts()
        dispatch ({
            type: 'ALL_PRODUCTS',
            data: products
        })
    }
}

export const deleteProduct = (productId) => {
    return async dispatch => {
        await productService.deleteAProduct(productId)
        dispatch ({
            type: 'DELETE_PRODUCT',
            data: productId
        })
    }
}

export default productReducer