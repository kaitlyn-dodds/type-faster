import type { ChallengeToken } from "./ChallengeToken";

export interface TypingChallenge {
    id: string,
    name: string,
    difficulty: "easy" | "medium" | "hard" | "expert",
    tokens: ChallengeToken[]
}