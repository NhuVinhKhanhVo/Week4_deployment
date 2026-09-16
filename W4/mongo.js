const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nhuvinhkhanhvo_db:${encodeURIComponent(password)}@cluster0.oezf6cr.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })



const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PersonDetail = mongoose.model("Person", personSchema)

const personDetail = new PersonDetail({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 3) {
    console.log("Displaying database content")
    console.log("phonebook: ")
    PersonDetail.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    personDetail.save().then(result => {
        console.log(`added ${personDetail.name} ${personDetail.number} to the phonebook`)
        mongoose.connection.close()
    })
}



// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })