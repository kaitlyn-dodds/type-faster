import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-title">
                    Type Faster
                </Link>
            </div>

            <div className="navbar-right">
                <Link to="/challenges" className="navbar-link">
                    Challenges
                </Link>
                <Link to="/leaderboard" className="navbar-link">
                    Leaderboard
                </Link>
            </div>
        </nav>
    );
}
