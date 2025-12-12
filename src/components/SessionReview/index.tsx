import './style.css'
import Stat from '../Stat'
import type { Session } from "../../types/Session"
import {
    formatTime,
    calculateRawWPM,
    calculateNetWPM,
    calculateKeystrokeAccuracy,
    formatAccuracy
} from '../../utils/sessionMetrics'

interface SessionReviewProps {
    session: Session
}

function SessionReview({ session }: SessionReviewProps) {
    return (
        <div className="session-review">
            <h1>Session Review</h1>

            <Stat label="Total Time" value={formatTime(session.totalTimeSeconds)} />
            <Stat label="Raw WPM" value={calculateRawWPM(session).toFixed(2)} />
            <Stat label="Net WPM" value={calculateNetWPM(session).toFixed(2)} />
            <Stat label="Keystroke Accuracy" value={formatAccuracy(calculateKeystrokeAccuracy(session))} />
            <Stat label="Total Characters" value={session.totalCharacters} />
            <Stat label="Correct Characters" value={session.correctCharacters} />
            <Stat label="Incorrect Characters" value={session.incorrectCharacters} />
            <Stat label="Backspaces" value={session.backspaces} />
        </div>
    )
}

export default SessionReview
