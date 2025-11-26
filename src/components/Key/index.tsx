import './style.css'

interface KeyProps {
    value: string,
    isPressed: boolean
}

function Key({value, isPressed}: KeyProps) {
    return (
        <button
            className={`key ${isPressed ? "pressed" : ""}`}
            id={value === "space" ? "space-bar" : undefined}
        >
            {value.toUpperCase()}
        </button>
    )
}

export default Key