import React, { useState, useEffect } from 'react'
import WordList from '../WordList.json'
import axios from 'axios'
import Timer from './Timer.js'

const Prompt = ({isLoggedIn, currUser, setCurrUser}) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  const [adj, setAdj] = useState(WordList.adj[getRandomInt(12)])
  const [noun, setNoun] = useState(WordList.noun[getRandomInt(12)])
  const [verb, setVerb] = useState(WordList.verb[getRandomInt(12)])
  const [currPrompt, setCurrPrompt] = useState(adj.concat(' ', noun, ' ', verb))
  const [isSaved, setIsSaved] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  const newPrompt = () => {
    setAdj(WordList.adj[getRandomInt(12)])
    setNoun(WordList.noun[getRandomInt(12)])
    setVerb(WordList.verb[getRandomInt(12)])
    setIsSaved(false)
  }

  useEffect(async () => {
    setCurrPrompt(adj.concat(' ', noun, ' ', verb))
  })

  const savePrompt = async () => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/saveprompt', { email, currPrompt})
    setCurrUser(data)
    setIsSaved(true)
  }
  
  return (
    <div className='prompt'>
      <h1> Draw something inspired by: </h1>
      <h2> {adj} </h2>
      <h2> {noun} </h2>
      <h2> {verb} </h2>
      {isLoggedIn && (     
        <div> 
          {!isSaved && <button type="button" onClick={() => savePrompt()}> Save </button>}
          <button type="button" onClick={() => setShowTimer(true)}> Timer </button>
        </div>
      )}
      <button type="button" onClick={() => {
        newPrompt()
        }}> 
      New Prompt </button>
      {showTimer && <Timer currUser={currUser} setCurrUser={setCurrUser} currPrompt={currPrompt} setShowTimer={setShowTimer}/>}
    </div>
  )
}

export default Prompt