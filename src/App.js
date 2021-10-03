import {useState, useEffect} from "react"

function App() {
  const [guess, setGuess] = useState("")
  const [guessList, setGuessList] = useState([])
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random () * 100) + 1)
  const [counter, setCounter] = useState(10)
  const [counterMessage, setCounterMessage] = useState(`Guesses left: ${counter}`)
  const [message, setMessage] = useState("")
  const [msgStyle, setMsgStyle] = useState({color:"black"})
  const [btnStyle, setBtnStyle] = useState({backgroundColor:"lightgray"})
  const [disabled, setDisabled] = useState(false)

  useEffect(
    () => {
      setCounter(counter => counter - 1)
      setCounterMessage(counterMessage => counterMessage)
    },[])

  const handleInput = (event) => {
    event.preventDefault()
    setGuess(event.target.value)
    setMsgStyle({color:"black"})
    setMessage("")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setBtnStyle({backgroundColor:"lightgray"})
    if (counter > 0 && guess >= 1 && guess <= 100){
      setCounter(counter => counter - 1)
      setMessage("")
      for (let i = 0; i < counter; i++){
        setGuessList(guessList.concat(guess))
        setGuess("")
        if (guess < randomNumber){
          setMsgStyle({color:"black"})
          setCounterMessage(`Guesses left: ${counter}, number is too low`)
        }
        if (guess > randomNumber){
          setMsgStyle({color:"black"})
          setCounterMessage(`Guesses left: ${counter}, number is too high`)
        }
        // eslint-disable-next-line eqeqeq
        if (guess == randomNumber){
          setGuessList(guessList.concat(guess))
          setMsgStyle({color:"tomato"})
          setMessage("Congrats! You won")
          setCounterMessage("")
          setDisabled(true)
          setBtnStyle({backgroundColor:"coral"})
        }
      }
    } else if (counter === 0 && guess >= 1 && guess <= 100) {
      setGuessList(guessList.concat(guess))
      setMsgStyle({color:"tomato"})
      setMessage("Game Over! No win")
      setCounterMessage("")
      setCounter(0)
      setDisabled(true)
      setBtnStyle({backgroundColor:"coral"})
    } else {
      setMsgStyle({color:"tomato"})
      setMessage(`Guess must be a number between 1-100`)
    }    
  }

  const handleReset = value => {
    setGuess("")
    setCounter(value-1)
    setGuessList([])
    setRandomNumber(Math.floor(Math.random () * (101 - 1) + 1))
    setMsgStyle({color:"black"})
    setMessage(`Guesses left: ${value}`)
    setDisabled(false)
    setBtnStyle({backgroundColor:"lightgray"})
  }

  return (
    <div className="container">
      <h1>Guess the Number Game</h1>
      <p>Guess a random number between 1 and 100.</p>
      <p>Enter a number:</p>
        <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={handleInput}
          disabled = {disabled ? "disabled" : ""}
        />
        <button 
          className="submit" 
          type="submit"
          disabled = {disabled ? "disabled" : ""}>Submit</button>
        </form>
      
      <p>Previous guesses: {guessList.join(" ")}</p>
      <p><b>{counterMessage}</b></p>
      <p style={msgStyle}><b>{message}</b></p>
      <button 
        onClick={() => 
          handleReset(10)}
          style={btnStyle}
          disabled = {disabled ? "" : "disabled"}
        >Play Again</button>
    </div>
  )
}

export default App