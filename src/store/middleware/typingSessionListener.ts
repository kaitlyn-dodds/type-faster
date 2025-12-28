import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    addProcessedToken,
    addUnprocessedToken,
    finishTypingSession,
    decrementCursorIndex,
    incrementBackspaces,
    incrementCorrectCharacters,
    incrementCursorIndex,
    incrementIncorrectCharacters,
    popProcessedToken,
    startProcessing,
    stopProcessing,
    incrementTotalCharacters,
    decrementCorrectCharacters
} from '../reducers/typingSessionReducer'
import type { ChallengeToken } from '../../features/typing-challenge/types/ChallengeToken'
import type { RootState } from '../store'

export const typingSessionListener = createListenerMiddleware()

// Listen for unprocessed tokens being added
typingSessionListener.startListening({
    actionCreator: addUnprocessedToken,
    effect: (_, listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState
        const typingSession = state.typingSession
        const processedTokens = typingSession.session.processedTokens
        const unprocessedTokens = typingSession.session.unprocessedTokens

        // only process if not already processing and there is something to process
        if (typingSession.processingToken || unprocessedTokens.length === 0) return

        const token: ChallengeToken = unprocessedTokens[unprocessedTokens.length - 1] // FIFO principle

        // start processing
        listenerApi.dispatch(startProcessing())

        // if the token is a backspace, need to pop the last processed token
        if (token.value === 'Backspace') {
            // pop last processed token
            if (processedTokens.length > 0) {
                listenerApi.dispatch(popProcessedToken(processedTokens[processedTokens.length - 1]))
            }

            // record backspace counter
            listenerApi.dispatch(incrementBackspaces())

            // stop processing w/out adding backspace to processed tokens
            listenerApi.dispatch(stopProcessing())

            return
        }

        // add to processed tokens
        listenerApi.dispatch(addProcessedToken(token))
        // stop processing
        listenerApi.dispatch(stopProcessing())
    },
})

// listen for processed tokens being added
typingSessionListener.startListening({
    actionCreator: addProcessedToken,
    effect: (action, listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState
        const typingSession = state.typingSession

        // increment total characters
        listenerApi.dispatch(incrementTotalCharacters())

        // need to check if token is correct or incorrect
        const submittedToken: ChallengeToken = action.payload
        const expectedToken: ChallengeToken = typingSession.session.challenge[typingSession.cursorIndex]

        if (submittedToken.value === expectedToken.value) { // correct
            listenerApi.dispatch(incrementCorrectCharacters())
            listenerApi.dispatch(incrementCursorIndex())
        } else { // incorrect
            listenerApi.dispatch(incrementIncorrectCharacters())
        }

        // check if session is complete
        if (typingSession.cursorIndex === typingSession.session.challenge.length - 1) {
            listenerApi.dispatch(finishTypingSession())
        }
    },
})

// listen for processed tokens being removed
typingSessionListener.startListening({
    actionCreator: popProcessedToken,
    effect: (action, listenerApi) => {
        const state: RootState = listenerApi.getState() as RootState
        const typingSession = state.typingSession

        // get token being removed
        const poppedToken: ChallengeToken = action.payload

        // need to check if token is correct or incorrect for the position in the challenge
        if (poppedToken && poppedToken.value === typingSession.session.challenge[typingSession.session.processedTokens.length].value) {
            listenerApi.dispatch(decrementCorrectCharacters())
        }

        // cursor should point to next expected token
        // which means the cursor should always point to processed tokens length + 1
        if (typingSession.cursorIndex >= typingSession.session.processedTokens.length + 1) {
            listenerApi.dispatch(decrementCursorIndex())
        }
    },
})