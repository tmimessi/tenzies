import React from 'react'
  
export default function Die(props) {
  return (
    <div
      className={`die ${props.isHeld ? 'held' : ''}`}
      onClick={props.holdDice} // each die has their own function that can identify which die was clicked
    >
      <h2 className="number">{props.value}</h2>
    </div>
  )
}
