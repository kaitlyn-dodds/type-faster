import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Challenges from "./views/Challenges";
import Leaderboard from "./views/Leaderboard";

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false)

  const startSession = () => {
    setIsSessionActive(true)
  }

  const handleSessionComplete = () => {
    setIsSessionActive(false)
  }

  return (
    <Router>
      <Navbar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
