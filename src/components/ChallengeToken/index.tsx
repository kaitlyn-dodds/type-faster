
interface ChallengeTokenProps {
    display: string,
    status: 'default' | 'entered' | 'enteredIncorrect',
    isCursor: boolean
}

function ChallengeToken({ display, status, isCursor }: ChallengeTokenProps) {
    const cursorClass = isCursor ? 'cursor' : ''
    return (
        <span className={`challenge-token ${status} ${cursorClass}`}>{display}</span>
    )
}

export default ChallengeToken
