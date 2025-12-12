import { useState } from 'react'
import './App.css'
import ChallengeSession from './components/ChallengeSession'
import Button from './components/Button'
import defaultChallenge from './data/challenges/default_challenge'

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false)

  const startSession = () => {
    setIsSessionActive(true)
  }

  const handleSessionComplete = () => {
    setIsSessionActive(false)
  }

  return (
    <>
      <h2>Type Faster!</h2>
      {!isSessionActive && <Button label="Start Challenge" onClick={startSession} />}
      {isSessionActive && (
        <ChallengeSession
          challenge={defaultChallenge}
          onComplete={handleSessionComplete}
        />
      )}
    </>
  )
}

export default App
