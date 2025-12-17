import type { ChallengeToken } from "../../../features/typing-challenge/types/ChallengeToken"
import type { TypingChallenge } from "../../../features/typing-challenge/types/typing-challenge"

const text = "Place your fingers on the keyboard and take a deep breath. Start typing at a " +
    "comfortable speed and do not rush. Focus on correct letters first and allow your " +
    "speed to improve naturally with practice."

const challengeTokens: ChallengeToken[] = text.split("").map(char => ({
    value: char,
    isEntered: false
}))

export const easyChallengeC: TypingChallenge = {
    id: "easy-c",
    difficulty: "easy",
    challengeTokens
}
