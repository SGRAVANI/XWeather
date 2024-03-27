import React from 'react'
// import styles from "./style.module.css"
import "./style.css"
export default function Card({dataType,ext,data}) {
  return (
    <div className="weather-card" >
        <h2>{dataType}</h2>
        <p>{data}{ext}</p>
        </div>
  )
}
