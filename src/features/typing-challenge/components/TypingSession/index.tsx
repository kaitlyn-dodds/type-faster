import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import SessionControls from "../SessionControls"
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../../store/store'
import { reset, setTotalTimeSeconds } from '../../../../store/reducers/typingSessionReducer'

function TypingSession() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const session = useSelector((state: RootState) => state.typingSession.session)

    // local session state
    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    // TODO: move character tracking to store
    // const trackCharacterSubmission = (token: ChallengeToken) => {
    //     const expectedToken = challenge.tokens[cursor]
    //     setTotalCharacters(prev => prev + 1)

    //     if (expectedToken && token.value === expectedToken.value) {
    //         setCorrectCharacters(prev => prev + 1)
    //         setCursor(prev => prev + 1)
    //     } else {
    //         setIncorrectCharacters(prev => prev + 1)
    //     }
    // }

    // TODO: move character removal tracking to store
    // const isRemovingCorrectCharacter = (token: ChallengeToken): boolean => {
    //     if (token.value === 'Backspace') return false
    //     const expectedToken = challenge.tokens[cursor]
    //     if (!expectedToken) return false
    //     return token.value === expectedToken.value
    // }

    // TODO: move character removal tracking to store
    // const trackCharacterRemoval = () => {
    //     if (submittedTokens.length === 0) return

    //     const lastSubmittedToken = submittedTokens[submittedTokens.length - 1]

    //     // If removing a correct character
    //     if (isRemovingCorrectCharacter(lastSubmittedToken)) {
    //         setCorrectCharacters(prev => prev - 1)
    //         setCursor(prev => prev - 1) // going backwards
    //     }
    // }

    const handleRestart = () => {
        // handle state reset
        dispatch(reset())

        setTimerStarted(false)
        setIsComplete(false)
    }

    const completeSession = () => {
        // Use elapsed seconds from timer
        dispatch(setTotalTimeSeconds(elapsedSeconds))
        setIsComplete(true)
    }

    const handleQuit = () => {
        navigate('/challenges')
        dispatch(reset())
    }

    // Timer with 10-minute failsafe
    useEffect(() => {
        if (!timerStarted || isComplete) return

        const interval = setInterval(() => {
            setElapsedSeconds(prev => {
                const newValue = prev + 1

                // Failsafe: Stop at 10 minutes (600 seconds)
                if (newValue >= 600) {
                    completeSession()
                    return prev
                }

                return newValue
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timerStarted, isComplete])

    // Check if challenge is complete
    // TODO: replace w/ some sort of event listener
    // useEffect(() => {
    //     if (submittedTokens.length === challenge.tokens.length) {
    //         // Check if all tokens match
    //         const allMatch = submittedTokens.every((token, index) =>
    //             token.value === challenge.tokens[index].value
    //         )

    //         if (allMatch) {
    //             completeSession()
    //         }
    //     }
    // }, [submittedTokens, challenge])

    if (isComplete) {
        return <SessionReview
            onRestartClick={handleRestart}
        />
    } else {
        return (
            <div className="challenge-session">
                <SessionControls
                    elapsedSeconds={elapsedSeconds}
                    onQuit={handleQuit}
                    onRestart={handleRestart}
                />

                <ChallengeText />

                <Keyboard />
            </div>
        )
    }
}

export default TypingSession
