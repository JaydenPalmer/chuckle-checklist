import { useEffect, useState } from "react"
import "./App.css"
import { postJoke } from "./services/jokeService.js"

export const App = () => {
const [allJokes, setAllJokes] = useState([])
const [textInput, setTextInput] = useState('')
const [inputBtn, setInputBtn] = useState(false)

useEffect(() => {
  if (inputBtn === true) {
    postJoke({
      "text": textInput,
      "told": false
    })
    setInputBtn(false)
    
    
  }
})

  return (
    <div id="app-container">
      <div className="app-heading">
        <h2 className="app-heading-text">Chuckle Checklist</h2> 
      </div>
      <div className="joke-add-form">
        <input className="joke-input" 
          type="text"
          placeholder="New One Liner"
          onChange={(event) => {
          const newJokeInput = setTextInput(event.target.value)
          }}
        />
    <button className="joke-input-submit"
      onClick={() => {
        setInputBtn(true)
        console.log("button clicked")
      }}
    >
      Add
    </button>
      </div>
      
    </div>
    
  )
}
