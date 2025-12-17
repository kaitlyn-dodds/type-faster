import type { ChallengeToken } from "../../features/typing-challenge/types/ChallengeToken"

const text = "Cats are the best animals. Dogs are good too, but nothing beats the love of a cat."

const defaultChallenge: ChallengeToken[] = text.split("").map(char => ({
    value: char,
    isEntered: false
}))

export default defaultChallenge
