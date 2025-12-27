import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Challenges from "./views/Challenges";
import Leaderboard from "./views/Leaderboard";
import TypingChallengeView from "./views/TypingChallenge";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/typing-challenge" element={<TypingChallengeView />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  )
}

export default App
