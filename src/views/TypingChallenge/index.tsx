import ChallengeSession from "../../components/ChallengeSession";
import defaultChallenge from '../../data/challenges/default_challenge'

export default function TypingChallenge() {
    return (
        <ChallengeSession
            challenge={defaultChallenge}
            onComplete={() => { }}
        />
    )
}
