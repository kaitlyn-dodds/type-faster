
interface ChallengeTokenProps {
    display: string,
    status: 'default' | 'entered' | 'enteredIncorrect'
}

function ChallengeToken({ display, status }: ChallengeTokenProps) {
    return (
        <span className={`challenge-token ${status}`}>{display}</span>
    )
}

export default ChallengeToken
