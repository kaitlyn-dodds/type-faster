import { useState } from 'react'
import Challenge from "../Challenge"
import Keyboard from "../Keyboard"
import type { Token } from "../../types/Token"

interface SessionProps {
    challenge: Token[]
}

function ChallengeSession({ challenge }: SessionProps) {
    const [submittedTokens, setSubmittedTokens] = useState<Token[]>([])

    const submitToken = (token: Token) => {
        console.log("submitToken: ", token)
        setSubmittedTokens(prev => [...prev, token])
        console.log("Submitted Tokens: ", submittedTokens.length)
    }

    const popToken = () => {
        // remove last token
        setSubmittedTokens(prev => prev.slice(0, prev.length - 1))
    }

    return (
        <div className="challenge-session">
            <Challenge challengeTokens={challenge} submittedTokens={submittedTokens}></Challenge>
            <Keyboard
                onTokenSubmit={submitToken}
                popToken={popToken}></Keyboard>
        </div>
    )
}

export default ChallengeSession
