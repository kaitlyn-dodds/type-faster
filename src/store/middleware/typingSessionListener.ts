import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    addProcessedToken,
    addUnprocessedToken,
    finishTypingSession,
    decrementCorrectCharacters,
    decrementCursorIndex,
    incrementBackspaces,
    incrementCorrectCharacters,
    incrementCursorIndex,
    incrementIncorrectCharacters,
    popProcessedToken,
    startProcessing,
    stopProcessing
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

        // only process if not already processing and there is something to process
        if (typingSession.processingToken || typingSession.session.unprocessedTokens.length === 0) return

        const token: ChallengeToken = typingSession.session.unprocessedTokens[typingSession.session.unprocessedTokens.length - 1] // FIFO principle

        // start processing
        listenerApi.dispatch(startProcessing())

        // TODO: process token

        // if the token is a backspace, need to pop the last processed token
        if (token.value === 'Backspace') {
            const lastProcessedToken: ChallengeToken = typingSession.session.processedTokens[typingSession.session.processedTokens.length - 1]
            listenerApi.dispatch(popProcessedToken(lastProcessedToken))
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

        // check if token being removed is correct or incorrect
        const expectedToken: ChallengeToken = typingSession.session.challenge[typingSession.cursorIndex]

        // if the token being removed is correct, need to decrement cursor index and correct characters
        if (poppedToken.value === expectedToken.value) {
            listenerApi.dispatch(decrementCorrectCharacters())
            listenerApi.dispatch(decrementCursorIndex())
        }
    },
})