import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallenge } from "../../store/reducers/typingSessionReducer";
import { getChallengesByDifficulty } from "../../features/challenge-selection/services/challenge-selection-service";

export default function Main() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quickStartChallenge = () => {
        // set challenge in store to first easy challenge
        dispatch(setChallenge(getChallengesByDifficulty("easy")[0].tokens))

        navigate("/typing-challenge")
    }

    return (
        <div className="main">
            <Button label="Quick Start" onClick={quickStartChallenge} />
        </div>
    );
}
