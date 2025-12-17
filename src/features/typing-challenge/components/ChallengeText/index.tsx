import './style.css'
import ChallengeToken from "../ChallengeToken"
import type { Token } from '../../../../types/Token'

interface ChallengeProps {
    challengeTokens: Token[],
    submittedTokens: Token[],
    cursor: number
}

function ChallengeText({ challengeTokens, submittedTokens, cursor }: ChallengeProps) {
    return (
        <>
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
                    <ChallengeToken
                        key={index}
                        display={token.value}
                        status={status}
                        isCursor={index === cursor}
                    />
                )
            })}
        </>
    )
}

export default ChallengeText
