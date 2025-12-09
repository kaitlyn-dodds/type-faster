import type { Session } from "../../types/Session"



interface SessionReviewProps {
    session: Session
    calcGrossWordsPerMinute: () => number
    formatTime: (totalSeconds: number) => string
}

function SessionReview({ session, calcGrossWordsPerMinute, formatTime }: SessionReviewProps) {
    return (
        <div>
            <h1>Session Review</h1>
            <p>Session Total Time: {formatTime(session.totalTimeSeconds)}</p>
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
