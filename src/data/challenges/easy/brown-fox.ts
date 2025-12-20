import type { ChallengeToken } from "../../../features/typing-challenge/types/ChallengeToken"
import type { TypingChallenge } from "../../../features/typing-challenge/types/typing-challenge"

const text = "The quick brown fox jumps over the lazy dog. This sentence is often used to " +
    "practice typing because it includes every letter. Keep your hands relaxed and focus " +
    "on accuracy as you type each word at a steady pace."

const challengeTokens: ChallengeToken[] = text.split("").map(char => ({
    value: char,
    isEntered: false
}))

export const easyChallengeA: TypingChallenge = {
    id: "easy-a",
    name: "The Quick Brown Fox",
    difficulty: "easy",
    challengeTokens
}
