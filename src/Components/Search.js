import React, { useState } from 'react'
import styles from "./style.module.css"
import { useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
export default function Search() {
  let [weatherData,setWeatherData]=useState()
  let [city,setCity]=useState("")
  let [f,setF]=useState(false)
  function handleChange(e)
  {
   // setF(true)
    setCity(e.target.value)
    
    
  }
  async function handleClick()
  {
    setF(true)
    fetchData('https://api.weatherapi.com/v1/current.json')
  }
  async function fetchData(url)
  {
    if(city)
    {
    try{
      
    let response= await axios.get(url,
      {
        params:{
    key:"ae898d0822a44b0eb5c135504232811",
    q:city,
    }})
    console.log(response.data)
    setWeatherData(response.data)
    
    }
    catch(e)
    {
   alert('Failed to fetch weather data')
    }
    setF(false)
  }
  }
  useEffect(()=>{
  if(!city)
  {
  setWeatherData(null)   
  setF(false) 
  }
  },[city])
  function generateCards()
  {
    if(weatherData)
    {
    let data=['Temperature','Humidity','Condition','Wind Speed'];
    let values=['temp_c','humidity','condition[text]','wind_kph']
    let list=data.map((ele,index)=>{
      let ext;
      if(ele=='Temperature')
      {
        ext="°C"
      }
      else if(ele=='Humidity')
      {
        ext="%"
      }
      else if(ele=="Wind Speed")
      {
        ext=" kph"
      }
      else{
        ext="";
      }
      if(index===2)
      {
        return <Card dataType={ele} key={index} ext={ext} data={weatherData.current.condition.text} />
      }
      return <Card dataType={ele} key={index} ext={ext} data={weatherData.current[values[index]]} />
    })
    return list;
    }
  }
  return (
    <div className={styles.container}>
    <div className={styles.searchBar}>
        <input type='text' placeholder='Enter city name' value={city} onChange={handleChange}/>
        <button  onClick={handleClick}>Search</button>
    </div>
    {f?  <p className={styles.loading}>Loading data...</p>:weatherData&&<div className={styles.cardContainer}>
          {  generateCards()}      
      </div>}

  {/* {weatherData&&<div className={styles.cardContainer}>
          {  generateCards()}      
      </div>} */}
    </div>
  )
}
