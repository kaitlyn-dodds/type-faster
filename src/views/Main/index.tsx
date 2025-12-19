import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { getChallengesByDifficulty } from "../../features/challenge-selection/services/challenge-selection-service";

export default function Main() {
    const navigate = useNavigate();

    const quickStartChallenge = () => {
        const challenges = getChallengesByDifficulty("easy")
        navigate("/typing-challenge", { state: { challenge: challenges[0] } })
    }

    return (
        <div className="main">
            <Button label="Quick Start" onClick={quickStartChallenge} />
        </div>
    );
}
