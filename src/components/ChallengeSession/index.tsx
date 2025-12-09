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
    const [totalWords, setTotalWords] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    const submitToken = (token: Token) => {
        // Start timer on first token
        if (!timerStarted) {
            setTimerStarted(true)
        }

        setSubmittedTokens(prev => [...prev, token])
    }

    const popToken = () => {
        // remove last token
        setSubmittedTokens(prev => prev.slice(0, prev.length - 1))
    }

    const completeSession = () => {
        // Use elapsed seconds from timer
        setTotalTimeSeconds(elapsedSeconds)
        setIsComplete(true)
    }

    const calcGrossWordsPerMinute = (): number => {
        // 5 characters per word
        const standardWords = totalCharacters / 5

        // convert time to minutes
        const minutes = totalTimeSeconds / 60

        // calculate words per minute
        return standardWords / minutes
    }

    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)

        // Format as MM:SS with leading zeros
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')

        return `${formattedMinutes}:${formattedSeconds}`
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
            totalWords,
            correctWords,
            backspaces
        }

        return <SessionReview
            session={sessionData}
            calcGrossWordsPerMinute={calcGrossWordsPerMinute}
            formatTime={formatTime} />
    } else {
        return (
            <div className="challenge-session">
                {/* Timer component in upper right */}
                <Timer elapsedSeconds={elapsedSeconds} />

                <Challenge challengeTokens={challenge} submittedTokens={submittedTokens}></Challenge>
                {!isComplete && (
                    <Keyboard
                        onTokenSubmit={submitToken}
                        popToken={popToken}></Keyboard>
                )}
            </div>
        )
    }
}

export default ChallengeSession
