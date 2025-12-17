import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Challenges from "./views/Challenges";
import Leaderboard from "./views/Leaderboard";
import TypingChallenge from "./views/TypingChallenge";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/typing-challenge" element={<TypingChallenge />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
