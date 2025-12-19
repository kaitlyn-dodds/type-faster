import Timer from "../../../../components/Timer"
import './style.css'

interface SessionControlsProps {
    elapsedSeconds: number
    onQuit: () => void
    onRestart: () => void
}

function SessionControls({ elapsedSeconds, onQuit, onRestart }: SessionControlsProps) {
    return (
        <div className="session-controls">
            <Timer elapsedSeconds={elapsedSeconds} />
            <div className="session-controls-buttons">
                <button
                    className="control-button quit-button"
                    onClick={onQuit}
                    aria-label="Quit session"
                >
                    Quit
                </button>
                <button
                    className="control-button restart-button"
                    onClick={onRestart}
                    aria-label="Restart session"
                >
                    Restart
                </button>
            </div>
        </div>
    )
}

export default SessionControls
