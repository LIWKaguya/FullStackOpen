import React, { useState, useEffect } from 'react'
import Country from './Country'
import axios from 'axios'

const SearchCountries = ({find, handleFindChange}) => {
  return (
    <div>
      <label>find countries</label>
      <input value={find} onChange={handleFindChange}/>
    </div>
  )
}

const CountryLine = ({country}) => {
  const [show, setNewShow] = useState(false)
  return (
    <div>
      {country.name.common}
      <button onClick={() => setNewShow(!show) }>show</button> 
      {show ? <Country country={country} /> : <></>}
    </div>
  )
}

const ShowingCountries = ({countries}) => {
  if(countries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }
  else if(countries.length > 1) {
    return (
      countries.map(country => <CountryLine key={country.name.common} country={country} />)
    )
  }
  return (
    countries.map(country => <Country key={country.name.common} country={country}/>)
  )
}

const App = () => {
  const [find, setNewFind] = useState('')
  const [countries, setNewCountries] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        setNewCountries(response.data)
      })
  }, [])


  const handleFindChange = (event) => {
    event.preventDefault()
    setNewFind(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))

  return (
    <div>
    <SearchCountries find={find} handleFindChange={handleFindChange} />
    <ShowingCountries countries={filteredCountries} />
    </div>
  )
}


export default App;
