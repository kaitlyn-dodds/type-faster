import './style.css'
import Key from '../Key'
import { useEffect, useState } from 'react'

export const KEYBOARD_LAYOUT: string[][] = [
    // Row 1
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],

    // Row 2
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],

    // Row 3
    ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"],

    // Row 4
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],

    // Row 5
    // ["control", "meta", "alt", "space", "alt", "meta", "contextmenu", "control"],

    // Arrow cluster (optional)
    // ["arrowup"],
    // ["arrowleft", "arrowdown", "arrowright"]
];

function Keyboard() {
    const [pressedKey, setPressedKey] = useState<string | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log("Pressed key is: ", e.key.toLowerCase())
            setPressedKey(e.key.toLowerCase())
        }

        const handleKeyUp = () => {
            setPressedKey(null)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return (
        <div className="keyboard">
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyVal) => (
                        <Key 
                            key={keyVal} 
                            value={keyVal} 
                            isPressed={pressedKey === keyVal} 
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard 
