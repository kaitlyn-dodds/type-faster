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

                    // iterate over challenge tokens and group them into words based on spaces
                    challengeTokens.forEach((token) => {
                        currentWord.push(token)
                        if (token.value === " ") {
                            words.push(currentWord)
                            currentWord = []
                        }
                    })

                    // add last word if it exists
                    if (currentWord.length > 0) {
                        words.push(currentWord)
                    }

                    // iterate over words and render them as ChallengeTokenDisplay components wrapped in divs
                    return words.map((word, wordIndex) => (
                        // wrap words in div for styling (keeps each letter of a word together)
                        <div key={wordIndex} className="challenge-word">
                            {word.map((token) => {
                                const index = globalIndex++
                                let status: 'default' | 'entered' | 'enteredIncorrect' = 'default'
                                const submittedToken = processedTokens[index]

                                if (submittedToken) {
                                    // if the submitted token matches the expected token and the cursor is at the correct position
                                    if (submittedToken.value === token.value && index < cursorIndex) {
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
