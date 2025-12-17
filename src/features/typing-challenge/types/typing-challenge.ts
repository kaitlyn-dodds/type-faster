import type { ChallengeToken } from "./ChallengeToken";

export interface TypingChallenge {
    id: string,
    difficulty: "easy" | "medium" | "hard" | "expert",
    challengeTokens: ChallengeToken[]
}