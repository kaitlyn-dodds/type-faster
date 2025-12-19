import { getChallengesByDifficulty } from "../../services/challenge-selection-service";
import type { TypingChallenge } from "../../../typing-challenge/types/typing-challenge";
import './style.css';

export default function ChallengeSelect() {
    const difficulties: TypingChallenge['difficulty'][] = ["easy", "medium", "hard", "expert"];

    return (
        <div className="challenge-select-container">
            {difficulties.map((difficulty) => (
                <div key={difficulty} className="difficulty-column">
                    <h2 className="difficulty-header">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
                    <div className="challenges-list">
                        {getChallengesByDifficulty(difficulty).map((challenge: TypingChallenge) => (
                            <button key={challenge.id} className="challenge-button">
                                {challenge.id}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
