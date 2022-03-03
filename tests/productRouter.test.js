const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Product = require('../models/product')
const api = supertest(app)

const initialProducts = [
    {
        title: "A comprehensive review on malware detection approaches",
        type: "article",
        authors: ["Ömer Aslan Aslan", "Refik Samet"],
        publication_date: "2020/01/03",
        publisher:"IEEE",
        citations:85,
        user: "61f7d55cf7051bbcdf3ec521",       
    },
    {
        title: "Face recognition-based mobile automatic classroom attendance management system",
        type: "project",
        authors: ["Muhammed Tanriverdi", "Refik Samet"],
        publication_date: "2017/09/20",
        publisher:"IEEE",
        citations:44,
        user: "61f7d55cf7051bbcdf3ec521",
    }
] 
let token = null

beforeEach(async () => {
    await Product.deleteMany({})
    for (let product of initialProducts) {
        let productObject = new Product(product)
        await productObject.save()
    }
    const loggedUser = {
        email:"adnan@ankara.edu.tr",
        password:"123Edsaqww"   
    }
    const response = await api
        .post('/login')
        .send(loggedUser)
        .expect(200)

    token = response.body.token
})


describe('getting products', () => {

    test('getting all product succeeds', async () => {

        await api
            .get(`/user/products`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })  

    test('getting a single product succeeds', async () => {
        const product = await Product.findOne({type: "article"})

        await api
            .get(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })  

    test('can\'t get a product without authentication', async () => {

        const product = await Product.findOne({type: "article"})
        await api
            .get(`/user/products/${product._id}`)
            .expect(401)
    }) 

    test('can\'t get all products without authentication', async () => {

        const product = await Product.findOne({type: "article"})
        await api
            .get(`/user/products/${product._id}`)
            .expect(401)
    }) 

    test('can\'t get products with an unverified email', async () => {

        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    
        token = response.body.token

        const product = await Product.findOne({type: "article"})
        await api
            .get(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)

        await api
            .get(`/user/products`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
    }) 

})

describe('creating a product', () => {

    test('creating new product succeeds', async () => {
        const product = {
            "title": "A new approach to the reconstruction of contour lines extracted from topographic maps",
            "type": "article",
            "authors": ["Emrah Hancer", "Refik Samet"],
            "publication_date": "2012/05/01",
            "publisher":"Academic Press",
            "citations":41,
        }

        await api
            .post('/user/products')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length + 1)
    })

    test('can\'t create a product with missing fields', async () => {
        const product = {
            "type": "article",
            "authors": ["Emrah Hancer", "Refik Samet"],
            "publication_date": "2012/05/01",
            "publisher":"Academic Press",
            "citations":41,
        }
        
        await api
            .post('/user/products')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect(400)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    })    

    test('can\'t create a product without authentication', async () => {
        const product = {
            "title": "A new approach to the reconstruction of contour lines extracted from topographic maps",
            "type": "article",
            "authors": ["Emrah Hancer", "Refik Samet"],
            "publication_date": "2012/05/01",
            "publisher":"Academic Press",
            "citations":41,
        }
        
        await api
            .post('/user/products')
            .send(product)
            .expect(401)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    }) 

    test('can\'t create products with an unverified email', async () => {

        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    
        token = response.body.token

        const product = {
            "title": "A new approach to the reconstruction of contour lines extracted from topographic maps",
            "type": "article",
            "authors": ["Emrah Hancer", "Refik Samet"],
            "publication_date": "2012/05/01",
            "publisher":"Academic Press",
            "citations":41,
        }
        
        await api
            .post('/user/products')
            .send(product)
            .expect(401)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    }) 
})

describe('editing a product', () => {

    test('editing a product succeeds', async () => {

        const product = await Product.findOne({type: "article"})
        const editedProduct = {
            title: "A comprehensive review on malware detection approaches",
            type: "project",
            citations: 90,
            authors: ["Ömer Aslan Aslan", "Refik Samet"],
            publication_date: "2020/01/03",
            publisher:"IEEE",
        }

        await api
            .put(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(editedProduct)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    })  

    test('can\'t edit a product without authentication', async () => {
        const product = await Product.findOne({type: "article"})
        const editedProduct = {
            title: "A comprehensive review on malware detection approaches",
            type: "project",
            citations: 90,
            authors: ["Ömer Aslan Aslan", "Refik Samet"],
            publication_date: "2020/01/03",
            publisher:"IEEE",
        }

        await api
            .put(`/user/products/${product._id}`)
            .send(editedProduct)
            .expect(401)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    }) 

    test('can\'t edit products with an unverified email', async () => {
        const product = await Product.findOne({type: "article"})

        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    
        token = response.body.token

        const editedProduct = {
            title: "A comprehensive review on malware detection approaches",
            type: "project",
            citations: 90,
            authors: ["Ömer Aslan Aslan", "Refik Samet"],
            publication_date: "2020/01/03",
            publisher:"IEEE",
        }

        await api
            .put(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(editedProduct)
            .expect(401)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    }) 
})

describe('deleting a product', () => {

    test('deleting a product succeeds', async () => {

        const product = await Product.findOne({type: "article"})
        await api
            .delete(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length-1)
    })  

    test('can\'t delete a product without authentication', async () => {

        const product = await Product.findOne({type: "article"})
        await api
            .delete(`/user/products/${product._id}`)
            .expect(401)
        
            const products = await Product.find({})
            expect(products)
                .toHaveLength(initialProducts.length)
    })  

    test('can\'t delete products with an unverified email', async () => {

        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    
        token = response.body.token

        const product = await Product.findOne({type: "article"})
        await api
            .delete(`/user/products/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
        
        const products = await Product.find({})
        expect(products)
            .toHaveLength(initialProducts.length)
    }) 
})


afterAll(() => {
    mongoose.connection.close()
  })