import './style.css'
import Key from '../Key'
import { useEffect, useState } from 'react'
import type { KeyData } from '../../types/KeyData'
import type { Token } from '../../types/Token'
import { DEFAULT_KEYBOARD_LAYOUT } from '../../constants/default_keyboard_layout'

interface KeyboardProps {
    onTokenSubmit: (token: Token) => void
}

function Keyboard({ onTokenSubmit }: KeyboardProps) {
    const [pressedKey, setPressedKey] = useState<KeyData | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = DEFAULT_KEYBOARD_LAYOUT.flat().find(k => k.id === e.code)
            if (key) {
                setPressedKey(key)

                onTokenSubmit({
                    value: key.value, // TODO: will need to convert keys to actual values (e.g. lowercase, uppercase, space, etc.)
                    isEntered: true
                })

                // need to prevent the default action here
                e.preventDefault()
            } else {
                console.error("KeyData not found for code: ", e.code)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (pressedKey && pressedKey.id === e.code) {
                console.warn("handleKeyUp triggered for key without KeyData: ", e.code)
            }
            // I think we want to set pressedKey to null here no matter what
            setPressedKey(null)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [pressedKey, onTokenSubmit])

    return (
        <div className="keyboard">
            {DEFAULT_KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyData) => (
                        <Key
                            key={keyData.id}
                            value={keyData.value}
                            display={keyData.display}
                            isPressed={pressedKey?.id === keyData.id}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard 
