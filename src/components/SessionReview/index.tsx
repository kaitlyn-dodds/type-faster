import './style.css'
import Stat from '../Stat'
import Button from '../Button'
import type { Session } from "../../types/Session"
import {
    formatTime,
    calculateRawWPM,
    calculateNetWPM,
    calculateKeystrokeAccuracy,
    formatAccuracy,
    calculateWPMQuality,
    calculateAccuracyQuality
} from '../../utils/sessionMetrics'

interface SessionReviewProps {
    session: Session
    onMenuClick: () => void
    onRestartClick: () => void
}

function SessionReview({ session, onMenuClick, onRestartClick }: SessionReviewProps) {

    const rawWPM = calculateRawWPM(session)
    const netWPM = calculateNetWPM(session)
    const accuracy = calculateKeystrokeAccuracy(session)

    const netWPMQuality = calculateWPMQuality(netWPM)
    const rawWPMQuality = calculateWPMQuality(rawWPM)
    const accuracyQuality = calculateAccuracyQuality(accuracy)

    return (
        <div className="session-review">
            <h1>Session Review</h1>

            <Stat label="Total Time" value={formatTime(session.totalTimeSeconds)} />
            <Stat label="Raw WPM" value={rawWPM.toFixed(2)} quality={rawWPMQuality.quality} />
            <Stat label="Net WPM" value={netWPM.toFixed(2)} quality={netWPMQuality.quality} />
            <Stat label="Keystroke Accuracy" value={formatAccuracy(accuracy)} quality={accuracyQuality.quality} />
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
