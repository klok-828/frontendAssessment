import React from 'react'
import "./Card.css"

function Card({ name, image }) {
  return (
    <div className='card-container'>
        <img src={image} className='cardImg'/>
        <div>
            {name}
        </div>
    </div>
  )
}

export default Card
