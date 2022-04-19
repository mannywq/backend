
//basic routing and middleware
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//database setup
require('dotenv').config()
const Person = require('./modules/person')
const { response } = require('express')

//start express server and serve static react files
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//configure morgan response
morgan.token('custom', (req, res) => {

  return JSON.stringify(req.body)

})
app.use(morgan(':method :url :status :custom'))



app.get('/', (request, response) => {

    response.send('<h1>Hello world!</h1>')
})

app.get('/info/', (req, res) => {

  date = new Date()

  res.type('text/html')
  res.send(`<p>The phonebook has ${persons.length} entries as of ${date}</p>`)

})

app.get('/api/persons/', (request, response, next) => {

    Person.find({})
    .then(result => {

      response.json(result)

    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {

  const body = request.body


  const person = new Person({
    name: body.name, 
    phone: body.phone
  })

  person.save()
  .then(savedPerson => {

    response.json(savedPerson)

  })
  .catch(error => next(error))


})

app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    console.log(id)

    Person.findById(id)
    .then(result => {

      if (result) {
      response.json(result)
      } else {

        response.status(404).end()
      }

    })
    .catch(error => next(error))
    

})

app.delete('/api/persons/:id', (request, response) => {

    const id = request.params.id

    Person.findByIdAndDelete(id)
    .then(result => {

      response.status(204).end()

    })
    .catch(error => {

      response.status(404).json({ error: error.message })


    })    
    

})

app.put('/api/persons/:id', (req, res, next) => {

  const id = req.params.id
  const body = req.body

  Person.findByIdAndUpdate( id, body, {new:true, runValidators:true, context: query})
  .then(data => {

    res.status(204).json(data)
  })
  .catch(error => next(error))


})

const errorHandler = (error, req, res, next) => {

  if (error.name === 'CastError') {

    return res.status(400).send({ error: 'invalid id'})
  }

  if (error.name === 'ValidationError') {

    return res.status(409).send(error.message)
  }
  
  next(error)

}

app.use(errorHandler)

const PORT = 3001

app.listen(PORT, () =>{

    console.log(`Server running on port ${PORT}`)
})      