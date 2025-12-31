import './style.css'

interface ChallengeTokenProps {
    display: string,
    status: 'default' | 'entered' | 'enteredIncorrect',
    isCursor: boolean
}

function ChallengeTokenDisplay({ display, status, isCursor }: ChallengeTokenProps) {
    const cursorClass = isCursor ? 'cursor' : ''
    return (
        <span className={`challenge-token ${status} ${cursorClass}`}>{display}</span>
    )
}

export default ChallengeTokenDisplay
