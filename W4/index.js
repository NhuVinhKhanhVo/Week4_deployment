const express = require("express")
const morgan  = require("morgan")
require('dotenv').config()
const PersonDetail = require('./models/person')




const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.static("dist"))



//Define token and expect to return string value so gotta stringify
morgan.token('type', (req,res) => {
  return JSON.stringify(req.body)
})

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Welcome</h1>')
})




//show contacts JSON
app.get('/api/persons', (request, response) => {
  PersonDetail.find({}).then(notes => {
    response.json(notes)
  })
})



//get info page
app.get('/info',
        (request,response) => {

        const timeSentRequest = new Date()
        response.send(`
            <p>Phonebook has info of ${contacts.length} people<p>
            <p>${timeSentRequest}<p>
            `)

    }
)

//get individual contact
app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {response.json(contact)}
    else {response.status(404).end()}
    
})

//DELETE A PERSON (code 204 is no content)
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})


//POST A PERSON
//RANDOM ID GENERATOR
const generateID = () => {
  const randomID = Math.floor(Math.random() * 10000)
  return String(randomID)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const trimmedName = body.name.trim()
  const trimmedNumber = body.number.trim()


  const existingPerson = contacts.find(
    contact => contact.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (existingPerson) {
    return response.status(400).json({ error: 'Name already exists' })
  }

  const contact = {
    id: generateID(),
    name: trimmedName,
    number: trimmedNumber
  }

  contacts = contacts.concat(contact)
  response.json(contact)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)