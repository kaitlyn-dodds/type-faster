import './style.css'
import { formatTime } from '../../utils/sessionMetrics'

interface TimerProps {
    elapsedSeconds: number
}

function Timer({ elapsedSeconds }: TimerProps) {
    return (
        <div className="timer">
            {formatTime(elapsedSeconds)}
        </div>
    )
}

export default Timer
