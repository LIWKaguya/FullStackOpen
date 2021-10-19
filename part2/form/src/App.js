import React, { useState } from 'react'
import Person from './Person'

const Filter = ({newTerm, handles}) => {
  return (
    <p>Filter with: <input value={newTerm} onChange={(event) => handles[2](event)} /></p>
  )
}

const Form = ({addPerson, handles, news}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          Name: <input value={news[0]} onChange={handles[0]} required/> <br />
          Number: <input value={news[1]} onChange={handles[1]} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const ShowPersons = ({persons}) => {
  return (
    persons.map(person => <Person key={person.name} person={person} />)
  )
}

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newTerm, setNewTerm ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTermChange = (event) => {
    setNewTerm(event.target.value)
  }

  const addPerson= (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.some(per => per.name === newName))
    {
      alert(`${newName} is already added to the phonebook`)
    }
    else
    {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handles = [handleNameChange, handleNumberChange, handleTermChange]
  const news = [newName, newNumber, newTerm]
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newTerm={newTerm} handles={handles}/>
      <h2>Add a new</h2>
      <Form addPerson={addPerson} handles={handles} news={news}/>
      <h2>Numbers</h2>
      <ShowPersons persons={filteredPersons} />
    </div>
  )
}

export default App