import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeText from "../ChallengeText"
import Keyboard from '../../../keyboard/components/Keyboard'
import SessionReview from "../../../challenge-review/components/SessionReview"
import SessionControls from "../SessionControls"
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { reset, startTimer, incrementTimerSeconds } from '../../../../store/reducers/typingSessionReducer'
import type { RootState } from '../../../../store/store'

function TypingSession() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isComplete, timer, session } = useSelector((state: RootState) => state.typingSession)
    const { started: timerStarted } = timer
    const { challenge } = session

    const handleRestart = () => {
        dispatch(reset())
    }

    const handleQuit = () => {
        dispatch(reset())
        navigate('/challenges')
    }

    // should clear state when TypingSession unmounts
    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [])

    // Timer with 10-minute failsafe
    useEffect(() => {
        if (!timerStarted || isComplete) return

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
        if (challenge.length === 0) {
            return <div className="challenges-reroute">
                <h2>Please select a challenge</h2>
                <button onClick={() => navigate('/challenges')}>Select Challenge</button>
            </div>
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
}

export default TypingSession
