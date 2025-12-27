import { createSlice } from "@reduxjs/toolkit";
import type { TypingSession } from "../../types/TypingSession";
import type { ChallengeToken } from "../../features/typing-challenge/types/ChallengeToken";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface TypingSessionState {
    session: TypingSession,
    processingToken: boolean,
    cursorIndex: number
}

export const typingSessionReducer = createSlice({
    name: "typingSession",
    initialState: {
        session: {
            id: uuidv4(),
            challenge: [] as ChallengeToken[],
            processedTokens: [] as ChallengeToken[],
            unprocessedTokens: [] as ChallengeToken[],
            totalCharacters: 0,
            correctCharacters: 0,
            incorrectCharacters: 0,
            backspaces: 0,
            totalTimeSeconds: 0,
        } as TypingSession,
        processingToken: false,
        cursorIndex: 0
    } as TypingSessionState,
    reducers: {
        // Processed tokens
        addProcessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            // Add token to the end
            state.session.processedTokens.push(action.payload)
        },
        popProcessedToken: (state) => {
            // Remove token from the end
            state.session.processedTokens.pop()
        },
        addUnprocessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            // Add token to the end
            state.session.unprocessedTokens.push(action.payload)

            // Increment total characters
            state.session.totalCharacters++
        },
        // Processing
        startProcessing: (state) => {
            state.processingToken = true
        },
        stopProcessing: (state) => {
            state.processingToken = false
        },
        // Challenge
        setChallenge: (state, action: PayloadAction<ChallengeToken[]>) => {
            state.session.challenge = action.payload
        },
        // Total Time Seconds
        setTotalTimeSeconds: (state, action: PayloadAction<number>) => {
            state.session.totalTimeSeconds = action.payload
        },
        // Correct Characters
        incrementCorrectCharacters: (state) => {
            state.session.correctCharacters++
        },
        // Incorrect Characters
        incrementIncorrectCharacters: (state) => {
            state.session.incorrectCharacters++
        },
        // Backspaces
        incrementBackspaces: (state) => {
            state.session.backspaces++
        },
        // Total Characters
        incrementTotalCharacters: (state) => {
            state.session.totalCharacters++
        },
        // Reset
        reset: (state) => {
            state.session = {
                id: "", // TODO: generate id
                challenge: [] as ChallengeToken[],
                processedTokens: [] as ChallengeToken[],
                unprocessedTokens: [] as ChallengeToken[],
                totalCharacters: 0,
                correctCharacters: 0,
                incorrectCharacters: 0,
                backspaces: 0,
                totalTimeSeconds: 0,
            }

            state.cursorIndex = 0
            state.processingToken = false
        }
    }
})

export const {
    addProcessedToken,
    popProcessedToken,
    addUnprocessedToken,
    startProcessing,
    stopProcessing,
    setChallenge,
    setTotalTimeSeconds,
    incrementCorrectCharacters,
    incrementIncorrectCharacters,
    incrementBackspaces,
    incrementTotalCharacters,
    reset
} = typingSessionReducer.actions

export default typingSessionReducer.reducer
