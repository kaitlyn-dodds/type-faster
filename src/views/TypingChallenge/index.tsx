import TypingSession from '../../features/typing-challenge/components/TypingSession'
import { useLocation } from 'react-router-dom'

export default function TypingChallengeView() {
    const { challenge } = useLocation().state;

    return (
        <TypingSession challenge={challenge} />
    )
}
