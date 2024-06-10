const path = require('path')

const express = require('express')
const app = express()

require('express-async-errors')
const cors = require('cors')
const methodOverride = require('method-override')
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

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// implemented before calling route handlers
app.use(cors({ exposedHeaders: ['Content-Disposition'] }))
app.use(express.static('build'))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(middleware.requestLogger)

// route handlers

app.use('/', loginRouter)
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/user/products', productRouter)
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'))
})

// implemented after calling route handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
