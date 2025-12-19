import './style.css'
import Stat from '../Stat'
import Button from '../../../../components/Button'
import type { TypingSession } from "../../../../features/challenge-review/types/TypingSession"
import {
    formatTime,
    calculateRawWPM,
    calculateNetWPM,
    calculateKeystrokeAccuracy,
    formatAccuracy,
    calculateWPMQuality,
    calculateAccuracyQuality
} from '../../../../utils/sessionMetrics'
import { useNavigate } from 'react-router-dom'

interface SessionReviewProps {
    session: TypingSession
    onRestartClick: () => void
}

function SessionReview({ session, onRestartClick }: SessionReviewProps) {
    const navigate = useNavigate()

    const rawWPM = calculateRawWPM(session)
    const netWPM = calculateNetWPM(session)
    const accuracy = calculateKeystrokeAccuracy(session)

    const netWPMQuality = calculateWPMQuality(netWPM)
    const rawWPMQuality = calculateWPMQuality(rawWPM)
    const accuracyQuality = calculateAccuracyQuality(accuracy)

    return (
        <div className="session-review">
            <h1>Session Review</h1>

            <h2>{netWPMQuality.message}</h2>

            <Stat label="Total Time" value={formatTime(session.totalTimeSeconds)} />
            <Stat label="Raw WPM" value={rawWPM.toFixed(2)} quality={rawWPMQuality} />
            <Stat label="Net WPM" value={netWPM.toFixed(2)} quality={netWPMQuality} />
            <Stat label="Keystroke Accuracy" value={formatAccuracy(accuracy)} quality={accuracyQuality} />
            <Stat label="Total Characters" value={session.totalCharacters} />
            <Stat label="Correct Characters" value={session.correctCharacters} />
            <Stat label="Incorrect Characters" value={session.incorrectCharacters} />
            <Stat label="Backspaces" value={session.backspaces} />

            <div className="button-container">
                <Button label="New Challenge" onClick={() => navigate('/challenges')} />
                <Button label="Restart" onClick={onRestartClick} />
            </div>
        </div>
    )
}

export default SessionReview
