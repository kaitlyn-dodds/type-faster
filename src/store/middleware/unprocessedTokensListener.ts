import { createListenerMiddleware } from '@reduxjs/toolkit'
import { addUnprocessedToken, startProcessing, stopProcessing } from '../reducers/unprocessedTokensReducer'
import type { ChallengeToken } from '../../features/typing-challenge/types/ChallengeToken'
import { addProcessedToken, popProcessedToken } from '../reducers/processedTokensReducer'
import type { UnprocessedTokensState } from '../reducers/unprocessedTokensReducer'
import type { RootState } from '../store'

export const unprocessedTokensListener = createListenerMiddleware()

unprocessedTokensListener.startListening({
    actionCreator: addUnprocessedToken,
    effect: (_, listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState
        const unprocessedTokensState = state.unprocessedTokens as UnprocessedTokensState

        // only process if not already processing and there is something to process
        if (unprocessedTokensState.processing || unprocessedTokensState.tokens.length === 0) return

        const token: ChallengeToken = unprocessedTokensState.tokens[unprocessedTokensState.tokens.length - 1] // FIFO principle

        // start processing
        listenerApi.dispatch(startProcessing())

        // TODO: process token

        // if the token is a backspace, need to pop the last processed token
        if (token.value === 'Backspace') {
            console.log("Popping last processed token")
            listenerApi.dispatch(popProcessedToken())

            // stop processing w/out adding backspace to processed tokens
            listenerApi.dispatch(stopProcessing())
            return
        }


        // add to processed tokens
        listenerApi.dispatch(addProcessedToken(token))
        // stop processing
        listenerApi.dispatch(stopProcessing())
        // TODO: leave tokens on the queue for now
    },
})