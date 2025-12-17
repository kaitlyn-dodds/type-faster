import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import Timer from "../../../../components/Timer"
import type { ChallengeToken } from "../../types/ChallengeToken"
import type { TypingSession } from "../../../challenge-review/types/TypingSession"
import './style.css'

interface SessionProps {
    challenge: ChallengeToken[]
    onComplete: () => void
}

function TypingSession({ challenge, onComplete }: SessionProps) {
    // Session state
    const [id] = useState(() => uuidv4())
    const [submittedTokens, setSubmittedTokens] = useState<ChallengeToken[]>([])
    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [totalTimeSeconds, setTotalTimeSeconds] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState(0)
    const [correctCharacters, setCorrectCharacters] = useState(0)
    const [incorrectCharacters, setIncorrectCharacters] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [cursor, setCursor] = useState(0)

    const trackCharacterSubmission = (token: ChallengeToken) => {
        const expectedToken = challenge[cursor]
        setTotalCharacters(prev => prev + 1)

        if (expectedToken && token.value === expectedToken.value) {
            setCorrectCharacters(prev => prev + 1)
            setCursor(prev => prev + 1)
        } else {
            setIncorrectCharacters(prev => prev + 1)
        }
    }

    const isRemovingCorrectCharacter = (token: ChallengeToken): boolean => {
        if (token.value === 'Backspace') return false
        const expectedToken = challenge[cursor]
        if (!expectedToken) return false
        return token.value === expectedToken.value
    }

    const trackCharacterRemoval = () => {
        if (submittedTokens.length === 0) return

        const lastSubmittedToken = submittedTokens[submittedTokens.length - 1]

        // If removing a correct character
        if (isRemovingCorrectCharacter(lastSubmittedToken)) {
            setCorrectCharacters(prev => prev - 1)
            setCursor(prev => prev - 1) // going backwards
        }
    }

    const submitToken = (token: ChallengeToken) => {
        if (!timerStarted) {
            setTimerStarted(true)
        }

        // Handle backspace separately
        if (token.value === "Backspace") {
            setBackspaces(prev => prev + 1)
            popToken()
            return
        }

        // Track and submit non-backspace tokens
        trackCharacterSubmission(token)
        setSubmittedTokens(prev => [...prev, token])
    }

    const popToken = () => {
        trackCharacterRemoval()
        setSubmittedTokens(prev => prev.slice(0, prev.length - 1))
    }

    const handleRestart = () => {
        setSubmittedTokens([])
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
    useEffect(() => {
        if (submittedTokens.length === challenge.length) {
            // Check if all tokens match
            const allMatch = submittedTokens.every((token, index) =>
                token.value === challenge[index].value
            )

            if (allMatch) {
                completeSession()
            }
        }
    }, [submittedTokens, challenge])

    if (isComplete) {
        // Build session data object matching Session interface
        const sessionData: TypingSession = {
            id,
            challenge,
            submittedTokens,
            totalTimeSeconds,
            totalCharacters,
            correctCharacters,
            incorrectCharacters,
            backspaces
        }

        return <SessionReview
            session={sessionData}
            onMenuClick={onComplete}
            onRestartClick={handleRestart}
        />
    } else {
        return (
            <div className="challenge-session">
                {/* Timer component in upper right */}
                <Timer elapsedSeconds={elapsedSeconds} />

                <ChallengeText challengeTokens={challenge} submittedTokens={submittedTokens} cursor={cursor}></ChallengeText>
                {!isComplete && (
                    <Keyboard
                        onTokenSubmit={submitToken} ></Keyboard>
                )}
            </div>
        )
    }
}

export default TypingSession
