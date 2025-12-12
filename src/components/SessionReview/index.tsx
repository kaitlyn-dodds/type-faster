import './style.css'
import Stat from '../Stat'
import Button from '../Button'
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
    onMenuClick: () => void
    onRestartClick: () => void
}

function SessionReview({ session, onMenuClick, onRestartClick }: SessionReviewProps) {
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

            <div className="button-container">
                <Button label="Menu" onClick={onMenuClick} />
                <Button label="Restart" onClick={onRestartClick} />
            </div>
        </div>
    )
}

export default SessionReview
