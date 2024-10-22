import { useEffect, useState } from "react"
import "./App.css"
import { getAllJokes, postJoke, changeTold, deleteJoke } from "./services/jokeService.js"
import stevePic from "./assets/steve.png"

export const App = () => {
const [allJokes, setAllJokes] = useState([])
const [untoldJokes, setUntoldJokes] = useState([])
const [toldJokes, setToldJokes] = useState([])
const [textInput, setTextInput] = useState('')
const [inputBtn, setInputBtn] = useState(false)
const [toldChange, setToldChange] = useState(null)
const [deleteChange, setDeleteChange] = useState(null)

const refreshJokes = async () => {
  getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr)
  })
}

useEffect(() => {
  getAllJokes().then((jokeArray) => {
    setAllJokes(jokeArray)
    console.log("jokes are set")
  })
}, [])

useEffect(() => {
  const addNewJoke = async () => {
    if (inputBtn) {
      await postJoke({
        "text": textInput,
        "told": false
      })
      .then()
        refreshJokes()
        setInputBtn(false)
        setTextInput('')
    }
  }

  addNewJoke()
}, [inputBtn, textInput])

useEffect(() => {
  const jokes = allJokes.filter(joke => joke.told)
  const notFunny = allJokes.filter(joke => !joke.told)
  setToldJokes(jokes)
  setUntoldJokes(notFunny)
  console.log("funny and not funny")
}, [allJokes])

useEffect(() => {
  const toldChangePut = async () => {
    if (toldChange) {
      const currentJoke = allJokes.find(joke => joke.id === toldChange)
        await changeTold(toldChange, currentJoke.text, !currentJoke.told)
        await refreshJokes()
        .then()
        setToldChange(null)
    }
  }
  toldChangePut()
}, [toldChange])

useEffect(() => {
  const deletePut = async () => {
    if (deleteChange) {
      const currentJoke = allJokes.find(joke => joke.id === deleteChange)
        await deleteJoke(deleteChange)
        await refreshJokes()
        setDeleteChange(null)
    }
  }
  deletePut()
}, [deleteChange])

  return (
    <div id="app-container">
      <div className="app-heading">
          <h1 className="app-heading-text">Chuckle Checklist</h1> 
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>
        <h2>add Joke</h2>
      <div className="joke-add-form">
        <input className="joke-input" 
          type="text"
          value={textInput}
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
        <div className="joke-lists-container">
          <div className="joke-list-container">
              <span className="untold-count">
                <h2>{untoldJokes.length}</h2>
              </span>
            <h2>Untold Jokes</h2>
          {untoldJokes.map((joke) => {
              return (
                <li key={joke.id} className="joke-list-item">
                <p  className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
                    <button onClick={() => {
                      setDeleteChange(joke.id)
                      console.log("a delete attempt was made")
                    }}>delete</button>
                  </div>
                <div className="joke-list-action-toggle">
                  <button  
                  onClick={() => {
                    setToldChange(joke.id)
                    console.log("clicked")
                  }}>mark as told</button>
                </div>
                  
                </li>
              )
            })}
          </div>
          <div className="joke-list-container">
              <span className="told-count">
                <h2>{toldJokes.length}</h2>
              </span>
            <h2>Told Jokes</h2>
            {toldJokes.map((joke) => {
              return (
                <li key={joke.id} className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-delete">
                    <button onClick={() => {
                      setDeleteChange(joke.id)
                      console.log("a delete attempt was made")
                    }}>delete</button>
                  </div>
                  <div className="joke-list-action-toggle">
                    <button 
                  onClick={() => {
                    setToldChange(joke.id)
                    console.log("clicked")
                  }}>mark as untold</button>
                  </div>
                  
                </li>
              )
            })}
          </div>
        </div>
    </div>
    
  )
}
