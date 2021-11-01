import {React} from 'react'
import formServices from './services/base'

const Person = ({ person }) => {
  const confirmDelete = () => {
    formServices.terminate(person)
  }

  return (
    <>
    <li>{person.name} {person.number}
    <button onClick={() => window.confirm(`Delete ${person.name} ?`) ? confirmDelete() : <></>}>
      Delete
    </button>
    </li>
    </>
  )
}

export default Person