import ChallengeSelect from "../../features/challenge-selection/components/ChallengeSelect"
import './style.css'

export default function Challenges() {
    return (
        <div className="challenges-view">
            <div className="challenges-view-header">
                <h1>Select a Challenge</h1>
                <p>Choose a challenge to get started</p>
            </div>

            <ChallengeSelect />
        </div>
    )
}
