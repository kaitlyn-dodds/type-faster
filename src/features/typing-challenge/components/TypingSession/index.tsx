import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import SessionControls from "../SessionControls"
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setTotalTimeSeconds, finishTypingSession, startTimer, incrementTimerSeconds } from '../../../../store/reducers/typingSessionReducer'
import type { RootState } from '../../../../store/store'

function TypingSession() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isComplete = useSelector((state: RootState) => state.typingSession.isComplete)
    const timerStarted = useSelector((state: RootState) => state.typingSession.timer.started)

    // local session state
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    const handleRestart = () => {
        // handle state reset
        dispatch(reset())
    }

    const completeSession = () => {
        // Use elapsed seconds from timer
        dispatch(setTotalTimeSeconds(elapsedSeconds))
        dispatch(finishTypingSession())
    }

    const handleQuit = () => {
        navigate('/challenges')
        dispatch(reset())
    }

    // Timer with 10-minute failsafe
    useEffect(() => {
        if (!timerStarted || isComplete) return
        console.log("Timer started")

        const interval = setInterval(() => {
            dispatch(incrementTimerSeconds())
        }, 1000)

        return () => clearInterval(interval)
    }, [timerStarted, isComplete])

    if (isComplete) {
        return <SessionReview
            onRestartClick={handleRestart}
        />
    } else {
        return (
            <div className="challenge-session">
                <SessionControls
                    onQuit={handleQuit}
                    onRestart={handleRestart}
                />

                <ChallengeText />

                <Keyboard onStartTimer={() => dispatch(startTimer())} />
            </div>
        )
    }
}

export default TypingSession
