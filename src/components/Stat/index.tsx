import './style.css'

interface StatProps {
    label: string
    value: string | number
}

function Stat({ label, value }: StatProps) {
    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>
    )
}

export default Stat
