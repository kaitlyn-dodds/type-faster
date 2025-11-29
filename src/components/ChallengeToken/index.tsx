
interface ChallengeTokenProps {
    display: string,
    isEntered: boolean
}

function ChallengeToken({ display }: ChallengeTokenProps) {
    return (
        <span>{display}</span>
    )
}

export default ChallengeToken
