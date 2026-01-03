import { getChallengesByDifficulty } from "../../services/challenge-selection-service";
import type { TypingChallenge } from "../../../typing-challenge/types/typing-challenge";
import { useNavigate } from "react-router-dom";
import './style.css';
import { useDispatch } from "react-redux";
import { setChallenge } from "../../../../store/reducers/typingSessionReducer";
import Button from "../../../../components/Button";

export default function ChallengeSelect() {
    const difficulties: TypingChallenge['difficulty'][] = ["easy", "medium", "hard", "expert"];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChallengeSelect = (challenge: TypingChallenge) => {
        dispatch(setChallenge(challenge.tokens))
        navigate("/typing-challenge");
    };

    return (
        <div className="challenge-select-container">
            {difficulties.map((difficulty) => (
                <div key={difficulty} className={`difficulty-column ${difficulty}-column`}>
                    <h2 className={`difficulty-header ${difficulty}-header`}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </h2>
                    <div className={`challenges-list ${difficulty}-challenges-list`}>
                        {getChallengesByDifficulty(difficulty).map((challenge: TypingChallenge) => (
                            <Button
                                key={challenge.id}
                                label={challenge.name}
                                onClick={() => handleChallengeSelect(challenge)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
