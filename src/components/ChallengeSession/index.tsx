import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Challenge from "../Challenge"
import Keyboard from "../Keyboard"
import SessionReview from "../SessionReview"
import Timer from "../Timer"
import type { Token } from "../../types/Token"
import type { Session } from "../../types/Session"
import './style.css'

interface SessionProps {
    challenge: Token[]
}

function ChallengeSession({ challenge }: SessionProps) {
    // Session state
    const [id] = useState(() => uuidv4())
    const [submittedTokens, setSubmittedTokens] = useState<Token[]>([])
    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [totalTimeSeconds, setTotalTimeSeconds] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState(0)
    const [correctCharacters, setCorrectCharacters] = useState(0)
    const [incorrectCharacters, setIncorrectCharacters] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [cursor, setCursor] = useState(0)

    const trackCharacterSubmission = (token: Token) => {
        const expectedToken = challenge[cursor]
        setTotalCharacters(prev => prev + 1)

        if (expectedToken && token.value === expectedToken.value) {
            setCorrectCharacters(prev => prev + 1)
            setCursor(prev => prev + 1)
        } else {
            setIncorrectCharacters(prev => prev + 1)
        }
    }

    const isRemovingCorrectCharacter = (token: Token): boolean => {
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

    const submitToken = (token: Token) => {
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
        const sessionData: Session = {
            id,
            challenge,
            submittedTokens,
            totalTimeSeconds,
            totalCharacters,
            correctCharacters,
            incorrectCharacters,
            backspaces
        }

        return <SessionReview session={sessionData} />
    } else {
        return (
            <div className="challenge-session">
                {/* Timer component in upper right */}
                <Timer elapsedSeconds={elapsedSeconds} />

                <Challenge challengeTokens={challenge} submittedTokens={submittedTokens} cursor={cursor}></Challenge>
                {!isComplete && (
                    <Keyboard
                        onTokenSubmit={submitToken} ></Keyboard>
                )}
            </div>
        )
    }
}

export default ChallengeSession
