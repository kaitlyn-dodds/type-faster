import './style.css'
import ChallengeTokenDisplay from "../ChallengeToken"
import type { ChallengeToken } from "../../types/ChallengeToken"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../store/store"

function ChallengeText() {
    const challengeTokens = useSelector((state: RootState) => state.typingSession.session.challenge)
    const processedTokens = useSelector((state: RootState) => state.typingSession.session.processedTokens)
    const cursorIndex = useSelector((state: RootState) => state.typingSession.cursorIndex)

    return (
        <div className="challenge-text">
            {
                (() => {
                    let globalIndex = 0
                    const words: ChallengeToken[][] = []
                    let currentWord: ChallengeToken[] = []

                    challengeTokens.forEach((token) => {
                        currentWord.push(token)
                        if (token.value === " ") {
                            words.push(currentWord)
                            currentWord = []
                        }
                    })
                    if (currentWord.length > 0) {
                        words.push(currentWord)
                    }

                    return words.map((word, wordIndex) => (
                        <div key={wordIndex} className="challenge-word">
                            {word.map((token) => {
                                const index = globalIndex++
                                let status: 'default' | 'entered' | 'enteredIncorrect' = 'default'
                                const submittedToken = processedTokens[index]

                                if (submittedToken) {
                                    if (submittedToken.value === token.value) {
                                        status = 'entered'
                                    } else {
                                        status = 'enteredIncorrect'
                                    }
                                }

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
                })()
            }
        </div>
    )
}

export default ChallengeText
