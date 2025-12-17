import './style.css'
import type { StatQuality } from '../../../../types/StatQuality'

interface StatProps {
    label: string
    value: string | number,
    quality?: StatQuality
}

function Stat({ label, value, quality = { quality: "default", message: "" } }: StatProps) {
    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span className={`value ${quality.quality}`} title={quality.message} >{value}</span>
        </div>
    )
}

export default Stat
