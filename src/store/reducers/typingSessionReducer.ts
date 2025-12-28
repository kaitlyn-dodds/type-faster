import { createSlice } from "@reduxjs/toolkit";
import type { TypingSession } from "../../types/TypingSession";
import type { ChallengeToken } from "../../features/typing-challenge/types/ChallengeToken";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface TypingSessionState {
    session: TypingSession,
    processingToken: boolean,
    cursorIndex: number,
    isComplete: boolean,
    timer: {
        started: boolean,
        elapsedSeconds: number
    }
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
        cursorIndex: 0,
        isComplete: false,
        timer: {
            started: false,
            elapsedSeconds: 0
        }
    } as TypingSessionState,
    reducers: {
        // Processed tokens
        addProcessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            // Add token to the end
            state.session.processedTokens.push(action.payload)
        },
        popProcessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            const tokenToPop: ChallengeToken = action.payload

            // Remove token from the end
            const lastProcessedToken: ChallengeToken | undefined = state.session.processedTokens.at(-1)

            if (lastProcessedToken && lastProcessedToken.value === tokenToPop.value) {
                state.session.processedTokens.pop()
            }
        },
        addUnprocessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            // Add token to the end
            state.session.unprocessedTokens.push(action.payload)
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
        decrementCorrectCharacters: (state) => {
            state.session.correctCharacters--
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
        // Cursor Index
        incrementCursorIndex: (state) => {
            // cursor index tracks expected place in challenge
            // should not be incremented beyond length of challenge
            if (state.cursorIndex >= state.session.challenge.length - 1) return

            state.cursorIndex++
        },
        decrementCursorIndex: (state) => {
            // don't decrement past 0
            if (state.cursorIndex <= 0) return

            state.cursorIndex--
        },
        // Complete
        finishTypingSession: (state) => {
            state.isComplete = true
            state.timer.started = false

            state.session.totalTimeSeconds = state.timer.elapsedSeconds
        },
        // Timer
        startTimer: (state) => {
            state.timer.started = true
        },
        stopTimer: (state) => {
            state.timer.started = false
        },
        incrementTimerSeconds: (state) => {
            state.timer.elapsedSeconds++
        },
        // Reset
        reset: (state) => {
            state.session = {
                id: uuidv4(),
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
            state.isComplete = false

            state.timer = {
                started: false,
                elapsedSeconds: 0
            }
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
    decrementCorrectCharacters,
    incrementIncorrectCharacters,
    incrementBackspaces,
    incrementTotalCharacters,
    incrementCursorIndex,
    decrementCursorIndex,
    startTimer,
    stopTimer,
    incrementTimerSeconds,
    finishTypingSession,
    reset
} = typingSessionReducer.actions

export default typingSessionReducer.reducer
