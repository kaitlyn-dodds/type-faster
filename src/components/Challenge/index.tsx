import './style.css'
import ChallengeToken from "../ChallengeToken"
import type { Token } from '../../types/Token'

interface ChallengeProps {
    challengeTokens: Token[],
    submittedTokens: Token[]
}

function Challenge({ challengeTokens, submittedTokens }: ChallengeProps) {

    return (
        <>
            {challengeTokens.map((key, index) => (
                <ChallengeToken
                    key={index}
                    display={key.value}
                    // if the submitted token has the same value as the challenge token
                    isEntered={submittedTokens[index]?.value === key.value}
                />
            ))}
        </>
    )
}

export default Challenge
