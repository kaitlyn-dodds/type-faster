import './style.css'

interface TimerProps {
    elapsedSeconds: number
}

function Timer({ elapsedSeconds }: TimerProps) {
    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)

        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')

        return `${formattedMinutes}:${formattedSeconds}`
    }

    return (
        <div className="timer">
            {formatTime(elapsedSeconds)}
        </div>
    )
}

export default Timer
