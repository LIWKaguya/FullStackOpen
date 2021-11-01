import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios';

const Weather = ({weather}) => {
    if(weather.length === 0) {
        return (
            <div></div>
        )
    }
    return (
        <div>
            <h2> Weather in {weather.name} </h2>
            <p>Temperature:{weather.main.temp} Celsius</p>
            <p>Wind speed:{weather.wind.speed} m/s</p> 
        </div>
    )
}

const Country = ({country}) => {
    const languages = [];
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key + '&units=metric'
    
    for(const [key, value] of Object.entries(country.languages)) {
        languages.push(<li key={key}>{value}</li>)
    }

    useEffect(() => { 
        let haveWeather = true
        axios.get(url)
        .then(response => {
        if(haveWeather)
        setWeather(response.data)
        })
        return () => haveWeather = false
    }, [url] )

    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Spoken language</h2>
        {languages}
        <br />
        <img src={country.flags.png} alt={country.name.common} />
        <Weather weather={weather} />
        </div>
    )
}

export default Country