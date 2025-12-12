import type { Session } from "../../types/Session"

interface SessionReviewProps {
    session: Session
}

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    // Format as MM:SS with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

// calculate words per minute based on total characters (correct + incorrect)
function rawWordsPerMinute(session: Session): number {
    const standardWords = session.totalCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

// calculate words per minute based on correct characters
function netWordsPerMinute(session: Session): number {
    const standardWords = session.correctCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

// keystroke accuracy based on total characters (correct + incorrect) divided by correct characters
function keystrokeAccuracy(session: Session): number {
    return (session.correctCharacters / session.totalCharacters) * 100
}

function formatAccuracy(accuracy: number): string {
    return accuracy.toFixed(2) + '%'
}

function SessionReview({ session }: SessionReviewProps) {
    return (
        <div>
            <h1>Session Review</h1>
            <p>Session Total Time: {formatTime(session.totalTimeSeconds)}</p>

            <p>Raw WPM: {rawWordsPerMinute(session).toFixed(2)}</p>
            <p>Net WPM: {netWordsPerMinute(session).toFixed(2)}</p>

            <p>Keystroke Accuracy: {formatAccuracy(keystrokeAccuracy(session))}</p>

            <p>Session Total Characters: {session.totalCharacters}</p>
            <p>Session Correct Characters: {session.correctCharacters}</p>
            <p>Session Incorrect Characters: {session.incorrectCharacters}</p>
            <p>Session Total Words: {session.totalWords}</p>
            <p>Session Correct Words: {session.correctWords}</p>
            <p>Session Backspaces: {session.backspaces}</p>
        </div>
    )
}

export default SessionReview
