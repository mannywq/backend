const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('custom', (req, res) => {

  return JSON.stringify(req.body)

})
app.use(morgan(':method :url :status :custom'))


let persons = [
        {
          "name": "Arto Hellas",
          "phone": "040-123456",
          "id": 1
        },
        {
          "name": "Ada Lovelace",
          "phone": "39-44-5323523",
          "id": 2
        },
        {
          "name": "Dan Abramov",
          "phone": "12-43-234345",
          "id": 3
        },
        {
          "name": "Mary Poppendieck",
          "phone": "39-23-6423122",
          "id": 4
        },
        {
          "name": "Akiko",
          "phone": "07045022252",
          "id": 5
        }
]

app.get('/', (request, response) => {

    response.send('<h1>Hello world!</h1>')
})

app.get('/info/', (req, res) => {

  date = new Date()

  res.type('text/html')
  res.send(`<p>The phonebook has ${persons.length} entries as of ${date}</p>`)

})

app.get('/api/persons/', (request, response) => {

    response.json(persons)

})

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body.name) {

    return response.status(400).json({ error: 'name missing'})

  }

  if (!body.phone) {

    return response.status(400).json({ error: 'number missing'})

  }


  let name = persons.find(p => p.name === body.name)

  if (name) {

    return response.status(400).json({ error: 'name already exists'})


  }

  let number = persons.find(p => p.phone === body.phone )

  if (number) {

    return response.status(400).json({ error: 'number already exists'})


  }


   const person = {

    name: body.name,
    phone: body.phone,
    id: generateId()
   }

    persons = persons.concat(person)
    console.log(person)

    response.json(person)
})

const generateId = () => {

  const max = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
  console.log(max)

  return max + 1

}

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    console.log(id)

    const person = persons.find(person => person.id === id)
    console.log(person)

    if (person)
    response.json(person)

    else
    response.status(404).json({ error: 'person not found'})

})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)

    let obj = persons.find(p => Number(p.id) === id)

    if (!obj) {

      return response.status(400).json({ error: 'person not found'})

    }

    persons = persons.filter(p => p.id !== id)
    
    response.status(204).end()

})

const PORT = 3001

app.listen(PORT, () =>{

    console.log(`Server running on port ${PORT}`)
})      