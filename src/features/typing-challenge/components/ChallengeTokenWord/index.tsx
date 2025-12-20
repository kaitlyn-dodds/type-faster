import type { ChallengeWord } from "../../types/challenge-word"
import ChallengeTokenDisplay from "../ChallengeToken"

interface ChallengeTokenWordProps {
    word: ChallengeWord
    submittedWord: ChallengeWord | undefined,
    cursor: number
}

export default function ChallengeTokenWord({ word, submittedWord, cursor }: ChallengeTokenWordProps) {
    return (
        <div>
            {word.tokens.map((token, index) => {
                const submittedToken = submittedWord?.tokens[index]

                if (submittedToken && submittedToken.value === token.value) {
                    submittedToken.status = 'entered'
                } else if (submittedToken && submittedToken.value !== token.value) {
                    submittedToken.status = 'enteredIncorrect'
                }

                return (
                    <ChallengeTokenDisplay
                        key={index}
                        display={token.value}
                        status={submittedToken?.status || token.status}
                        isCursor={index === cursor}
                    />
                )
            })}
        </div>
    )
}
