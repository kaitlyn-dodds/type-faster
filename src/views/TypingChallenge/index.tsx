import TypingSession from "../../features/typing-challenge/components/TypingSession";
import defaultChallenge from '../../data/challenges/default_challenge'

export default function TypingChallenge() {
    return (
        <TypingSession
            challenge={defaultChallenge}
            onComplete={() => { }}
        />
    )
}
