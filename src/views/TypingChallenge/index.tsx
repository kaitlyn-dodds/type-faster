import defaultChallenge from '../../data/challenges/default-challenge'
import TypingSession from '../../features/typing-challenge/components/TypingSession'

export default function TypingChallenge() {
    return (
        <TypingSession challenge={defaultChallenge} />
    )
}
