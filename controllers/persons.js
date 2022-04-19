const personRouter = require('express').Router()
const person = require('../models/person')
const Person = require('../models/person')


personRouter.get('/info/', (req, res) => {

  date = new Date()

  res.type('text/html')
  res.send(`<p>The phonebook has ${persons.length} entries as of ${date}</p>`)

})

personRouter.get('/', (request, response, next) => {

    Person.find({})
    .then(result => {

      response.json(result)

    })
    .catch(error => next(error))

})

personRouter.post('/', (request, response, next) => {

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

personRouter.get('/:id', (request, response) => {

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

personRouter.delete('/:id', (request, response) => {

    const id = request.params.id

    Person.findByIdAndDelete(id)
    .then(result => {

      response.status(204).end()

    })
    .catch(error => {

      response.status(404).json({ error: error.message })


    })    
    

})

personRouter.put('/api/persons/:id', (req, res, next) => {

  const id = req.params.id
  const body = req.body

  Person.findByIdAndUpdate( id, body, {new:true, runValidators:true, context: query})
  .then(data => {

    res.status(204).json(data)
  })
  .catch(error => next(error))


})

module.exports = personRouter