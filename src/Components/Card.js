import React from 'react'
import styles from "./style.module.css"
export default function Card({dataType,ext,data}) {
  return (
    <div className={styles.cardBody} >
        <h2>{dataType}</h2>
        <p>{data}{ext}</p>
        </div>
  )
}
