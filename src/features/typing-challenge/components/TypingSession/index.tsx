import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import SessionControls from "../SessionControls"
import type { TypingSession as TypingSessionData } from "../../../challenge-review/types/TypingSession"
import './style.css'
import type { TypingChallenge } from '../../types/typing-challenge'
import { clearUnprocessedTokens } from '../../../../store/reducers/unprocessedTokensReducer'
import { clearProcessedTokens } from '../../../../store/reducers/processedTokensReducer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../../store/store'

interface SessionProps {
    challenge: TypingChallenge
}

function TypingSession({ challenge }: SessionProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const processedTokens = useSelector((state: RootState) => state.processedTokens)

    // Session state
    const [id] = useState(() => uuidv4())
    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [totalTimeSeconds, setTotalTimeSeconds] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState(0)
    const [correctCharacters, setCorrectCharacters] = useState(0)
    const [incorrectCharacters, setIncorrectCharacters] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [cursor, setCursor] = useState(0)

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
        dispatch(clearUnprocessedTokens())
        dispatch(clearProcessedTokens())


        setTimerStarted(false)
        setElapsedSeconds(0)
        setTotalTimeSeconds(0)
        setTotalCharacters(0)
        setCorrectCharacters(0)
        setIncorrectCharacters(0)
        setBackspaces(0)
        setIsComplete(false)
        setCursor(0)
    }

    const completeSession = () => {
        // Use elapsed seconds from timer
        setTotalTimeSeconds(elapsedSeconds)
        setIsComplete(true)
    }

    const handleQuit = () => {
        navigate('/challenges')
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
        // Build session data object matching Session interface
        const sessionData: TypingSessionData = {
            id,
            challenge: challenge.tokens,
            submittedTokens: processedTokens,
            totalTimeSeconds,
            totalCharacters,
            correctCharacters,
            incorrectCharacters,
            backspaces
        }

        return <SessionReview
            session={sessionData}
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

                <ChallengeText
                    challengeTokens={challenge.tokens}
                    cursor={cursor} />

                <Keyboard />
            </div>
        )
    }
}

export default TypingSession
