import './style.css'

interface KeyProps {
    key: string,
    value: string,
    isPressed: boolean
}

function Key({key, value, isPressed}: KeyProps) {
    return (
        <button className={`key ${isPressed ? "pressed" : ""}`} >{value.toUpperCase()}</button>
    )
}

export default Key
