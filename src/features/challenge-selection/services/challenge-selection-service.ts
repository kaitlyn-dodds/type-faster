import type { TypingChallenge } from "../../typing-challenge/types/typing-challenge";

// easy challenges
import { challenges as easyChallenges } from "../../../data/challenges/easy";
// medium challenges
import { challenges as mediumChallenges } from "../../../data/challenges/medium";
// hard challenges
import { challenges as hardChallenges } from "../../../data/challenges/hard";
// expert challenges
import { challenges as expertChallenges } from "../../../data/challenges/expert";

// collect all challenges
const challenges = [
    ...easyChallenges,
    ...mediumChallenges,
    ...hardChallenges,
    ...expertChallenges
];

export function getChallengesByDifficulty(
    difficulty: TypingChallenge["difficulty"]
): TypingChallenge[] {
    return challenges.filter((c: TypingChallenge) => c.difficulty === difficulty);
}

export function getChallengeById(id: string): TypingChallenge | undefined {
    return challenges.find(c => c.id === id);
}