import { getChallengesByDifficulty } from "../../services/challenge-selection-service";
import type { TypingChallenge } from "../../../typing-challenge/types/typing-challenge";

export default function ChallengeSelect() {
    const challenges = getChallengesByDifficulty("easy");

    return (
        <ul>
            {challenges.map((challenge: TypingChallenge) => (
                <li key={challenge.id}>{challenge.id}</li>
            ))}
        </ul>
    );
}
