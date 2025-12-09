import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Challenge from "../Challenge"
import Keyboard from "../Keyboard"
import SessionReview from "../SessionReview"
import type { Token } from "../../types/Token"
import type { Session } from "../../types/Session"

interface SessionProps {
    challenge: Token[]
}

function ChallengeSession({ challenge }: SessionProps) {
    // Session state
    const [id] = useState(() => uuidv4())
    const [submittedTokens, setSubmittedTokens] = useState<Token[]>([])
    const [startTime] = useState(() => new Date())
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [totalTimeSeconds, setTotalTimeSeconds] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState(0)
    const [correctCharacters, setCorrectCharacters] = useState(0)
    const [incorrectCharacters, setIncorrectCharacters] = useState(0)
    const [totalWords, setTotalWords] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    const submitToken = (token: Token) => {
        setSubmittedTokens(prev => [...prev, token])
    }

    const popToken = () => {
        // remove last token
        setSubmittedTokens(prev => prev.slice(0, prev.length - 1))
    }

    const completeSession = () => {
        setEndTime(new Date())
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
            startTime,
            endTime: endTime!,
            totalTimeSeconds,
            totalCharacters,
            correctCharacters,
            incorrectCharacters,
            totalWords,
            correctWords,
            backspaces
        }

        return <SessionReview session={sessionData} calcGrossWordsPerMinute={calcGrossWordsPerMinute} />
    } else {
        return (
            <div className="challenge-session">
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
