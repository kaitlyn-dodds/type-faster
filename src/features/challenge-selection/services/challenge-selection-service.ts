import type { TypingChallenge } from "../../typing-challenge/types/typing-challenge";

// easy challenges
import { challenges as easyChallenges } from "../../../data/challenges/easy";

export function getChallengesByDifficulty(
    difficulty: TypingChallenge["difficulty"]
): TypingChallenge[] {
    // TODO: add more difficulty levels
    return easyChallenges.filter((c: TypingChallenge) => c.difficulty === difficulty);
}

export function getChallengeById(id: string): TypingChallenge | undefined {
    return easyChallenges.find(c => c.id === id);
}