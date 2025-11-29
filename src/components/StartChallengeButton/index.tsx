interface StartChallengeButtonProps {
    onStart: () => void;
}

function StartChallengeButton({ onStart }: StartChallengeButtonProps) {
    return (
        <button onClick={onStart}>
            Start Challenge
        </button>
    )
}

export default StartChallengeButton
