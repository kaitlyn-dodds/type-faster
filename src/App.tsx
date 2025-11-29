import { useState } from 'react'
import './App.css'
import ChallengeSession from './components/ChallengeSession'
import StartChallengeButton from './components/StartChallengeButton'
import defaultChallenge from './data/challenges/default_challenge'

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false)

  const startSession = () => {
    setIsSessionActive(true)
  }

  return (
    <>
      <h2>Type Faster!</h2>
      {!isSessionActive && <StartChallengeButton onStart={startSession} />}
      {isSessionActive && <ChallengeSession challenge={defaultChallenge} />}
    </>
  )
}

export default App
