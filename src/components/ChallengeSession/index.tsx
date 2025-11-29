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
        setSubmittedTokens(prev => [...prev, token])

        // log submitted tokens
        const tokenLog: string = submittedTokens.map(token => token.value).join("")
        console.log("Current Submitted Tokens:")
        console.log(tokenLog)
    }

    return (
        <div className="challenge-session">
            <Challenge challengeTokens={challenge} submittedTokens={submittedTokens}></Challenge>
            <Keyboard onTokenSubmit={submitToken}></Keyboard>
        </div>
    )
}

export default ChallengeSession
