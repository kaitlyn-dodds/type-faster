import './style.css'
import Stat from '../Stat'
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
        <div className="session-review">
            <h1>Session Review</h1>

            <Stat label="Total Time" value={formatTime(session.totalTimeSeconds)} />
            <Stat label="Raw WPM" value={rawWordsPerMinute(session).toFixed(2)} />
            <Stat label="Net WPM" value={netWordsPerMinute(session).toFixed(2)} />
            <Stat label="Keystroke Accuracy" value={formatAccuracy(keystrokeAccuracy(session))} />
            <Stat label="Total Characters" value={session.totalCharacters} />
            <Stat label="Correct Characters" value={session.correctCharacters} />
            <Stat label="Incorrect Characters" value={session.incorrectCharacters} />
            <Stat label="Backspaces" value={session.backspaces} />
        </div>
    )
}

export default SessionReview
