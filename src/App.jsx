import React from 'react'
import Die from './components/Die'
// nanoid is a fast way of generating a random id
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  // setting the second parameter as dice because I only want this effect to run anytime the dice array changes in state
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) // this array method will look for a specific condition and if every item in that array returns a true for that condition then it will as a .every method return the value true --- so if all die is held, it will return true; if at least one of them is not being held, then it will return false.
    const firstValue = dice[0].value // checking if they all have the same value
    // and now I have a reference point for me to do the following:
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won!')
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // everytime we call this function, we are creating an array of objects (dice)
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      // math.ceil >> so it will start on 1, not on 0
      newDice.push(generateNewDie())
    }
    return newDice
  }

  //if the user has not won the game yet, this function will held the die it's clicked and generate a new ones using the function generateNewDie; if he has already won, then it will have to clean the color and set all new dice
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // this function will flip `isHeld` to change the color of the dice
  // meaning: if it is the same die with the id property that was passed in to the function, then i'll update that object, and if it's not, i'll just return this die
  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  // maping over our array of objects (dice) and 'die' is an object, so value needs to be die.value (this will render the dice components which one containing a random number)
  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld} // letting the die component know whether or no is being held is the isHeld property
      holdDice={() => holdDice(die.id)} // holdDice will be this anonymous function which will call holdDice with die.id as its parameter; this is embbeding the id as the parameter that will be called with the holdDice function whenever each one of the dice is clicked
    />
  ))

  return (
    <main>
      {/* if tenzies is true (win) then render the confetti component; otherwise, don't. */}
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}
