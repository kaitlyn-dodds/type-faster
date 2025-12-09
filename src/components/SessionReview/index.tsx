import type { Session } from "../../types/Session"

function totalTimeInMinutes(totalTimeSeconds: number) {
    return totalTimeSeconds / 60
}

interface SessionReviewProps {
    session: Session
    calcGrossWordsPerMinute: () => number
}

function SessionReview({ session, calcGrossWordsPerMinute }: SessionReviewProps) {
    return (
        <div>
            <h1>Session Review</h1>
            <p>Session Total Time: {totalTimeInMinutes(session.totalTimeSeconds)}</p>
            <p>Session Total Characters: {session.totalCharacters}</p>
            <p>Session Correct Characters: {session.correctCharacters}</p>
            <p>Session Incorrect Characters: {session.incorrectCharacters}</p>
            <p>Session Total Words: {session.totalWords}</p>
            <p>Session Correct Words: {session.correctWords}</p>
            <p>Session Backspaces: {session.backspaces}</p>
            <p>Gross WPM: {calcGrossWordsPerMinute().toFixed(2)}</p>
        </div>
    )
}

export default SessionReview
