import './style.css'
import ChallengeTokenDisplay from "../ChallengeToken"
import type { ChallengeToken } from "../../types/ChallengeToken"

interface ChallengeProps {
    challengeTokens: ChallengeToken[],
    submittedTokens: ChallengeToken[],
    cursor: number
}

function ChallengeText({ challengeTokens, submittedTokens, cursor }: ChallengeProps) {
    return (
        <div className="challenge-text">
            {challengeTokens.map((token, index) => {
                let status: 'default' | 'entered' | 'enteredIncorrect' = 'default'
                const submittedToken = submittedTokens[index]

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
                        isCursor={index === cursor}
                    />
                )
            })}
        </div>
    )
}

export default ChallengeText
