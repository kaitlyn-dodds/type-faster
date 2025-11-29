import type { Token } from "../../types/Token"

const text = "Cats are the best animals. Dogs are good too, but nothing beats the love of a cat."

const defaultChallenge: Token[] = text.split("").map(char => ({
    value: char,
    isEntered: false
}))

export default defaultChallenge
