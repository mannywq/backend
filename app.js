const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const cors = require('cors')
const app = express()
const personRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

url = config.MONGO_URI

logger.info('connecting to', url)

mongoose.connect(url)
.then(response =>
    logger.info('connected to', url)
    )
    .catch((error) => {

       logger.error('Trouble connecting to database: ', error.message)


    })


app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/persons/', personRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)


module.exports = app
