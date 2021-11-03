import React, { useState, useEffect } from 'react'
import formServices from './services/base'
import Person from './Person'
import './index.css'

const Unsuscessfully = ({unsuscessMessage}) => {
  if(unsuscessMessage === null)
  {
    return null
  }
  return (
      <div className="error">
        {unsuscessMessage}
      </div>
    )
}

const Suscessfully = ({suscessMessage}) => {
  if(suscessMessage === null) {
    return null
  }
  else
  {
    return (
      <p className="suscess">{suscessMessage}</p>
    )
  }
}

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
  const [ suscessMessage, setSuscessMessage ] = useState(null)
  const [ unsuscessMessage, setUnsuscessMessage ] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTermChange = (event) => {
    setNewTerm(event.target.value)
  }

  useEffect(() => {
    formServices.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson= (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    // if(persons.some(per => per.name === newName))
    // {
    //   if(window.confirm(`${person.name} is already in the phonebook. Do you want to update the number ?`))
    //   {
    //     const identical = persons.filter(per => per.name === newName)
    //     person.id = identical[0].id  
    //     formServices.update(person)
    //     .catch(error => {
    //       setUnsuscessMessage(`${person.name} has already been deleted`)
    //       setTimeout(() => {
    //         setUnsuscessMessage(null)
    //       }, 5000)
    //   })
    //   }
    // }
      formServices.create(person)
      .then(setPersons(persons.concat(person)))
      .then(setSuscessMessage(`${person.name} added to the phone book`))
      .then(setTimeout(() => {setSuscessMessage(null)}, 5000))
    setNewName('')
    setNewNumber('')
  }

  const handles = [handleNameChange, handleNumberChange, handleTermChange]
  const news = [newName, newNumber, newTerm]
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newTerm.toLowerCase()))

  return (
    <div>
      <Suscessfully suscessMessage={suscessMessage}/>
      <Unsuscessfully unsuscessMessage={unsuscessMessage}/>
      <h1>Phonebook</h1>
      <Filter newTerm={newTerm} handles={handles}/>
      <h1>Add a new</h1>
      <Form addPerson={addPerson} handles={handles} news={news}/>
      <h1>Numbers</h1>
      <ShowPersons persons={filteredPersons} />
    </div>
  )
}

export default App