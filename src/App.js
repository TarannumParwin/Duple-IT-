import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [city, setCity] = useState("");
  const [ info, setInfo] = useState({} )

  const getDetails = (cityName) =>{
    if(!cityName) return
    const api = `http://api.weatherstack.com/current?access_key=65e6b5138948dda99e8c142f6950eca3&query=${cityName}`
    axios.get(api).then((res)=>{
      console.log("response", res.data);
      setInfo(res.data);
    }).catch((err)=>{
      console.log("err", err);
    })
  }

  const handleChange =(e) =>{
    console.log("value", e.target.value);
    setCity(e.target.value);
  }

  const handleSearch = () =>{
    getDetails(city);
    console.log("tara",city);
  }
  
  return (
    <>
      <div className='App'>
        <h1>Weather App</h1>
        <div className='searcharea'>
          <input type="text" value={city} onChange={handleChange} />
          <button type='button' onClick={handleSearch} >Search</button>
        </div>

        {
        Object.keys(info).length > 0 && 
        <div>
        <h4> Name :{info?.location.name}</h4>
        <p>Country : {info.location.country}</p>
        <p>Region : {info.location.region}</p>
        <p><img src={info.current.weather_icons} alt="" /></p>
        <p>temprerature: {info.current.temperature}</p>
        <p>wind speed : {info.current.wind_speed}</p>
        <p>localTime : {info.location.localtime}</p>
        </div>
      }
      </div>
    </>
  );
}

export default App;