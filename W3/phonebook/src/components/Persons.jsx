const Person = ({ person, deletePerson }) => {

  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </li>
  )
}

const Persons = ({ contactToShow, deletePerson }) => {
  return (
    <ul>
      {contactToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
    </ul>
  )
}


const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} type="text" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}



export {Persons,PersonForm}