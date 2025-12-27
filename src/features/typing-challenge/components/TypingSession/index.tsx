import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import SessionControls from "../SessionControls"
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setTotalTimeSeconds } from '../../../../store/reducers/typingSessionReducer'
import type { RootState } from '../../../../store/store'

function TypingSession() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isComplete = useSelector((state: RootState) => state.typingSession.isComplete)

    // local session state
    const [timerStarted, setTimerStarted] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    const handleRestart = () => {
        // handle state reset
        dispatch(reset())

        setTimerStarted(false)
    }

    const completeSession = () => {
        // Use elapsed seconds from timer
        dispatch(setTotalTimeSeconds(elapsedSeconds))
    }

    const handleQuit = () => {
        navigate('/challenges')
        dispatch(reset())
    }

    // Timer with 10-minute failsafe
    useEffect(() => {
        if (!timerStarted || isComplete) return

        const interval = setInterval(() => {
            setElapsedSeconds(prev => {
                const newValue = prev + 1

                // Failsafe: Stop at 10 minutes (600 seconds)
                if (newValue >= 600) {
                    completeSession()
                    return prev
                }

                return newValue
            })
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
                    elapsedSeconds={elapsedSeconds}
                    onQuit={handleQuit}
                    onRestart={handleRestart}
                />

                <ChallengeText />

                <Keyboard />
            </div>
        )
    }
}

export default TypingSession
