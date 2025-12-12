import './style.css'

interface StatProps {
    label: string
    value: string | number,
    quality?: string
}

function Stat({ label, value, quality = "default" }: StatProps) {
    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span className={`value ${quality}`}>{value}</span>
        </div>
    )
}

export default Stat
