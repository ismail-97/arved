const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream') 
const crypto = require('crypto')
const mongoose = require('mongoose')

const productRouter = require('express').Router()
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')
const config = require('../utils/config')

//database models
const Product = require('../models/product')

let gfs, gridfsBucket;
mongoose.connection.once('open', () => {
        gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'uploads'
              });
        gfs = Grid(mongoose.connection.db, mongoose.mongo)
        gfs.collection('uploads');
    })
      
const storage = new GridFsStorage({
        url: config.MONGODB_URI,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err)
                    }
              const filename = file.originalname
              const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo)
            })
          })
        }
      })
      
const upload = multer({ storage })

// routes
productRouter.get('/',
        [isAuthenticated, isVerified],
        async (request, response) => {
                const  userId  = request.userId
                const userProducts = await Product.find({ user: userId })
                response.json(userProducts).status(200)
        })

        
productRouter.post('/',
        [isAuthenticated, isVerified, upload.single('file')],
        async (request, response) => {  

                console.log("typeof authors == ", typeof request.body.authors)
                console.log("authors == ", request.body.authors)
                const body = {
                        title: request.body.title,
                        type: request.body.type,
                        authors: typeof request.body.authors === "string" ? JSON.parse(request.body.authors) : request.body.authors,
                        publication_date: request.body.publication_date,
                        publisher: request.body.publisher,
                        citations: request.body.citations,
                        fileID: request.file.id.toString(),
                        url: request.body.url,
                        description: request.body.description
                }
                const userId = request.userId
                const product = new Product({...body, user: userId})
                const savedProduct = await product.save()
                response
                        .status(201)
                        .json(savedProduct)
        })
        
productRouter.get('/files/:id',
        [isAuthenticated, isVerified],
        async (request, response) => {
                gfs.files.findOne({ _id: mongoose.Types.ObjectId(request.params.id) }, async (err, file) => {
                        if (!file || file.length === 0) {
                          return response.status(404).json({
                            error: "That File Doesn't Exist"
                          });
                        }
                        if (file.contentType === "application/pdf") {
                          // Read output to browser
                                const readstream = gridfsBucket.openDownloadStream(file._id);
                                // response.setHeader("Content-Disposition", 'attachment; filename="' + file.filename + '"')
                                response.writeHead(200, {
                                        'Content-Disposition':  file.filename,
                                        'Content-Type': 'application/pdf',
                                        'Content-Transfer-Encoding': 'Binary'
                                });
                                readstream.pipe(response);
                        } else {
                            response.status(404).json({
                            error: "This is not a pdf file"
                          });
                        }
                });
        })

productRouter.get('/:id',
        [isAuthenticated, isVerified],
        async (request, response) => {
            const product = await Product.findById(request.params.id)
            response.json(product)
        })

productRouter.put('/:id',
        [isAuthenticated, isVerified, upload.single('file')],
        async (request, response) => {
            const body = request.body    
                const product = {
                        ...body,
                        fileID: request.file.id.toString(),
                        authors: JSON.parse(body.authors),
                }
                // deleteFile(request.params.id)
                
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

const deleteFile = async (productId) => {
        const product = await Product.findById(productId)
        gridfsBucket.delete(new mongoose.Types.ObjectId(productId.fileID),
                (err, date) => {
                        if (err) {
                                return res.status(404).json({ err: err})
                        }
                        res.status.json({
                                success: true,
                                message: `File with Id ${productId.fileID} is deleted`
                        })
                }
        )
}
module.exports = productRouter
