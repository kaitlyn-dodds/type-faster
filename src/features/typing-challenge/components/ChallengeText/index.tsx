import './style.css'
import ChallengeTokenDisplay from "../ChallengeToken"
import type { ChallengeToken } from "../../types/ChallengeToken"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../store/store"
import { useMemo } from 'react'

// Helper function to group tokens into words based on spaces
function groupTokensIntoWords(tokens: ChallengeToken[]): ChallengeToken[][] {
    const words: ChallengeToken[][] = []
    let currentWord: ChallengeToken[] = []

    tokens.forEach((token) => {
        currentWord.push(token)
        if (token.value === " ") {
            words.push(currentWord)
            currentWord = []
        }
    })

    // Add last word if it exists
    if (currentWord.length > 0) {
        words.push(currentWord)
    }

    return words
}

// Helper function to calculate token status
function getTokenStatus(
    token: ChallengeToken,
    submittedToken: ChallengeToken | undefined,
    index: number,
    cursorIndex: number
): 'default' | 'entered' | 'enteredIncorrect' {
    if (!submittedToken) {
        return 'default'
    }

    // If the submitted token matches the expected token and cursor is past this position
    if (submittedToken.value === token.value && index < cursorIndex) {
        return 'entered'
    }

    return 'enteredIncorrect'
}

function ChallengeText() {
    const { session, cursorIndex } = useSelector((state: RootState) => ({
        session: state.typingSession.session,
        cursorIndex: state.typingSession.cursorIndex
    }))

    const { challenge: challengeTokens, processedTokens } = session

    // Memoize word grouping to avoid recalculating on every render
    const words = useMemo(() => groupTokensIntoWords(challengeTokens), [challengeTokens])

    return (
        <div className="challenge-text">
            {(() => {
                let globalIndex = 0

                return words.map((word, wordIndex) => (
                    <div key={wordIndex} className="challenge-word">
                        {word.map((token) => {
                            const index = globalIndex++
                            const submittedToken = processedTokens[index]
                            const status = getTokenStatus(token, submittedToken, index, cursorIndex)

                            return (
                                <ChallengeTokenDisplay
                                    key={index}
                                    display={token.value}
                                    status={status}
                                    isCursor={index === cursorIndex}
                                />
                            )
                        })}
                    </div>
                ))
            })()}
        </div>
    )
}

export default ChallengeText
