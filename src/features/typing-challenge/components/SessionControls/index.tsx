import Timer from "../../../../components/Timer"
import './style.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../store/store'

interface SessionControlsProps {
    onQuit: () => void
    onRestart: () => void
}

function SessionControls({ onQuit, onRestart }: SessionControlsProps) {

    const { elapsedSeconds } = useSelector((state: RootState) => state.typingSession.timer)

    return (
        <div className="session-controls">
            <Timer elapsedSeconds={elapsedSeconds} />
            <div className="session-controls-buttons">
                <button
                    className="control-button session-quit-button"
                    onClick={onQuit}
                    aria-label="Quit session"
                >
                    Quit
                </button>
                <button
                    className="control-button session-restart-button"
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
