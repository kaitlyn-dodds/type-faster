import type { ChallengeToken } from "../../../features/typing-challenge/types/ChallengeToken"
import type { TypingChallenge } from "../../../features/typing-challenge/types/typing-challenge"

const text = "Every morning I make a cup of coffee and sit near the window. The day feels " +
    "calm before work begins. Typing slowly and correctly helps build confidence and " +
    "improves muscle memory over time."

const challengeTokens: ChallengeToken[] = text.split("").map(char => ({
    value: char,
    isEntered: false
}))

export const easyChallengeB: TypingChallenge = {
    id: "easy-b",
    name: "Every Morning",
    difficulty: "easy",
    challengeTokens
}
