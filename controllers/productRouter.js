const productRouter = require('express').Router()
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')

//database models
const Product = require('../models/product')
    

// routes
productRouter.get('/',
        [isAuthenticated, isVerified],
        async (request, response) => {
                const  userId  = request.userId
                const userProducts = await Product.find({ user: userId })
                console.log(userProducts)
                response.json(userProducts).status(200)
        })

productRouter.post('/',
        [isAuthenticated, isVerified],
        async (request, response) => {
                const body = request.body
                const userId = request.userId
                const product = new Product({...body, user: userId})
                const savedProduct = await product.save()
                response
                        .status(201)
                        .json(savedProduct.toJSON())
        })

productRouter.get('/:id',
        [isAuthenticated, isVerified],
        async (request, response) => {
            const product = await Product.findById(request.params.id)
            response.json(product)
        })

productRouter.put('/:id',
        [isAuthenticated, isVerified],
        async (request, response) => {
            const body = request.body    
            const product = {...body}
            const updatedProduct = await Product.findByIdAndUpdate(request.params.id, product, { new: true })
            response
                .status(200)
                .json(updatedProduct)
        })

productRouter.delete('/:id',
        [isAuthenticated, isVerified],
        async (request, response) => {
            await Product.findByIdAndRemove(request.params.id)
            response.status(204).end()
        })

module.exports = productRouter
