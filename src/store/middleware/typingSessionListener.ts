import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    addProcessedToken,
    addUnprocessedToken,
    popProcessedToken,
    startProcessing,
    stopProcessing
} from '../reducers/typingSessionReducer'
import type { ChallengeToken } from '../../features/typing-challenge/types/ChallengeToken'
import type { RootState } from '../store'

export const typingSessionListener = createListenerMiddleware()

typingSessionListener.startListening({
    actionCreator: addUnprocessedToken,
    effect: (_, listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState
        const typingSession = state.typingSession

        // only process if not already processing and there is something to process
        if (typingSession.processingToken || typingSession.session.unprocessedTokens.length === 0) return

        const token: ChallengeToken = typingSession.session.unprocessedTokens[typingSession.session.unprocessedTokens.length - 1] // FIFO principle

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