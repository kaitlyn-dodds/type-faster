import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ChallengeToken } from "../../features/typing-challenge/types/ChallengeToken"

// Should function as a queue
// Tokens are added to the end
// Tokens are popped from the front
// All tokens are processed in order (FIFO)

export interface UnprocessedTokensState {
    tokens: ChallengeToken[],
    processing: boolean
}

export const unprocessedTokensReducer = createSlice({
    name: "unprocessedTokens",
    initialState: {
        tokens: [] as ChallengeToken[],
        processing: false
    } as UnprocessedTokensState,
    reducers: {
        addUnprocessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            console.log("Adding unprocessed token", action.payload)
            // Add token to the end
            state.tokens.push(action.payload)
        },
        clearUnprocessedTokens: (state) => {
            // Clear all tokens
            state.tokens = []
        },
        startProcessing: (state) => {
            state.processing = true
        },
        stopProcessing: (state) => {
            state.processing = false
        },

    },
})

export const {
    addUnprocessedToken,
    clearUnprocessedTokens,
    startProcessing,
    stopProcessing
} = unprocessedTokensReducer.actions

export default unprocessedTokensReducer.reducer
