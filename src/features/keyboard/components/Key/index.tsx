import type { KeyData } from '../../types/KeyData'
import './style.css'

interface KeyProps {
    KeyData: KeyData,
    isPressed: boolean
}

function Key({ KeyData, isPressed }: KeyProps) {
    const imageUrl = new URL(KeyData.img!, import.meta.url).href

    return (
        <img
            className={`key ${isPressed ? "pressed" : ""}`}
            src={imageUrl}
            id={KeyData.value === " " ? "space-bar" : undefined}
            alt={KeyData.id}
        />
    )
}

export default Key