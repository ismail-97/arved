const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

// Routers
const loginRouter = require('./controllers/loginRouter')
const userRouter = require('./controllers/userRouter')
const productRouter = require('./controllers/productRouter')
const adminRouter = require('./controllers/adminRouter')

// utils
const middleware = require('./utils/middleware')

const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

//database connection
logger.info('connecting to', config.MONGODB_URI)
logger.info("hello == ", config.MONGODB_URI)
const conn = mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
  
// implemented before calling route handlers
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// route handlers
app.use('/', loginRouter)
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/user/products', productRouter)

// implemented after calling route handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app