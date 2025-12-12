import type { Token } from "./Token"

export interface Session {
    /**
     * A unique identifier for the session
     */
    id: string
    /**
     * The challenge that the user is typing
     */
    challenge: Token[]
    /**
     * The tokens that the user has submitted
     */
    submittedTokens: Token[]
    /**
     * The total time the user spent typing in seconds
     */
    totalTimeSeconds: number
    /**
     * The total number of characters the user typed
     */
    totalCharacters: number
    /**
     * The total number of correct characters the user typed
     */
    correctCharacters: number
    /**
     * The total number of incorrect characters the user typed
     */
    incorrectCharacters: number
    /**
     * The total number of backspaces the user performed
     */
    backspaces: number
}