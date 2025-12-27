import type { ChallengeToken } from "../features/typing-challenge/types/ChallengeToken"

export interface TypingSession {
    /**
     * A unique identifier for the session
     */
    id: string
    /**
     * The challenge that the user is typing
     */
    challenge: ChallengeToken[]
    /**
     * All processed tokens that the user submitted
     */
    processedTokens: ChallengeToken[]
    /**
     * All raw tokens that the user submitted, in order
     */
    unprocessedTokens: ChallengeToken[]
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