import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Challenges from "./views/Challenges";
import Leaderboard from "./views/Leaderboard";
import TypingChallengeView from "./views/TypingChallengeView";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Footer from "./components/Footer";
import './fonts.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Challenges />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/typing-challenge" element={<TypingChallengeView />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </Provider>
  )
}

export default App
