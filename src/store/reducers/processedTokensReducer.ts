import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ChallengeToken } from "../../features/typing-challenge/types/ChallengeToken"

// Not a queue, just a list of tokens that have been processed
// Tokens should be added in order they are processed
// Tokens are processed before they are added to the store
// Tokens are removed from the end of the store 

export const processedTokensReducer = createSlice({
    name: "processedTokens",
    initialState: [] as ChallengeToken[],
    reducers: {
        addProcessedToken: (state, action: PayloadAction<ChallengeToken>) => {
            // TODO: process tokens

            // Add token to the end
            state.push(action.payload)
        },
        popProcessedToken: (state) => {
            // Remove token from the end
            state.pop()
        },
        clearProcessedTokens: (state) => {
            // Clear all tokens
            state = []
        },
    },
})

export const { addProcessedToken, popProcessedToken, clearProcessedTokens } = processedTokensReducer.actions

export default processedTokensReducer.reducer

