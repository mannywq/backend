const logger = require('./logger')

const requestLogger = (req, res, next) => {

    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
 }

 const unknownEndPoint = (req, res) => {

    res.status(404).send({error: 'unknown endpoint'})
 }

 const errorHandler = (error, req, res, next) => {

    if (error.name === 'CastError') {
  
      return res.status(400).send({ error: 'invalid id'})
    }
  
    if (error.name === 'ValidationError') {
  
      return res.status(409).send(error.message)
    }
    
    next(error)
  
  }

  module.exports = {

    requestLogger,
    unknownEndPoint, 
    errorHandler
  }