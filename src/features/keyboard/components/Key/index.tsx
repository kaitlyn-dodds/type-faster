import './style.css'

interface KeyProps {
    value: string,
    display: string,
    isPressed: boolean
}

function Key({ value, display, isPressed }: KeyProps) {
    return (
        <button
            className={`key ${isPressed ? "pressed" : ""}`}
            id={value === " " ? "space-bar" : undefined}
        >
            {display}
        </button>
    )
}

export default Key