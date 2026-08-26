import { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from './services/persons'
import Notification from './components/Notification'
import {Persons,PersonForm} from './components/Persons'
import Filter from './components/Filter'
import './style.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


    useEffect(() => {
      axios
      .get("/api/persons")
      .then(response => {
        setPersons(response.data)
      })
    },[])



  const addName = (event) => {
    event.preventDefault()

    const strippedName = newName.trim()
    const strippedNumber= newNumber.trim()

    //CHECK IF BOTH BOX IS FILLED, EVEN WITH SINGLE DIGIT
    if (strippedName === '' || strippedNumber === '') {
      window.alert('Both name and number must be filled in')
      return
    }

    //BOOLEAN IF A PERSON ALREADY EXIST
    const existingPerson = persons.find(
      person => person.name.toLowerCase() === strippedName.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${strippedName} is already added to phonebook, replace the old number with a new one?`
      )


      if (confirmUpdate) {
      // IN THE CASE OF EXISTING PERSON
      //ANSWERED "YES" TO UPDATE
      //CALL FUNCTION updatedPerson, copies the existing list but aim at that existing person and change number
      //THEN MAP EVERYTHING OUT AGAIN
        const updatedPerson = { ...existingPerson, number: strippedNumber }
        peopleService
          .replacePerson(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            notify(`Updated ${returnedPerson.name}'s number`)
          })
      }
      return
    }
    //IN THE CASE OF NO EXISTING PERSON
    //NEW PERSON OBJECT WITH NAME AND NUMBER
    //CONCAT TO EXISTING LIST AND TRIGGER RE-RENDER, SHOWING THEIR NAME
    const newPersonObject = {
      name: strippedName,
      number: strippedNumber
    }

    peopleService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify(`Added ${returnedPerson.name}'s number`)
      })
  }

  //change state dynamically as we type in values (prevent default so no reloadin everytime)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchTerm = (event) => setSearchTerm(event.target.value)

  //CONVERT NAME FROM LIST TO LOWERCASE IN THE BACK AND COMPARE TO SEARCH TERM WITH includes()
  const filterTerm = (person) => person.name.toLowerCase().includes(searchTerm.toLowerCase())

  //RETURN AND ARRAY (copy not mutate) THAT MATCHES THE SEARCH TERM
  //EMPTY STRING IS SUBSTRING OF EVERY STRING SO NO SEARCH = ALL RESULTS
  const contactToShow = persons.filter(filterTerm)


    const deletePersons = id => {
      if (window.confirm("Do you truly want to delete this person")){
        //deletedperson returns a copy of the array without that guy
        //personToDelete returns a matching element to show in message
        const deletedperson = persons.filter(n => n.id !== id)
        const personToDelete = persons.find(n => n.id === id)
        peopleService
          .deletePerson(id)
          .then(returnedList => {
            setPersons(deletedperson)
            notify(`Successfully deleted ${personToDelete.name}`)
          })
      } else {
        return
      }
    }



  const notify = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons contactToShow={contactToShow} deletePerson={deletePersons} />
    </div>
  )
}

export default App