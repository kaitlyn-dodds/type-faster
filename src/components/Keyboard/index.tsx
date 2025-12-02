import './style.css'
import Key from '../Key'
import { useEffect, useState } from 'react'
import type { KeyData } from '../../types/KeyData'
import type { Token } from '../../types/Token'
import { DEFAULT_KEYBOARD_LAYOUT } from '../../constants/default_keyboard_layout'

interface KeyboardProps {
    onTokenSubmit: (token: Token) => void,
    popToken: () => void
}

function getKeyByCode(keyCode: string) {
    return DEFAULT_KEYBOARD_LAYOUT.flat().find(k => k.id === keyCode)
}

function Keyboard({ onTokenSubmit, popToken }: KeyboardProps) {
    const [pressedKeys, setPressedKeys] = useState<Set<KeyData>>(new Set())

    useEffect(() => {
        // adds key to pressedKeys set
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = getKeyByCode(e.code)

            if (key) {
                setPressedKeys(prev => new Set(prev).add(key))

                // if key is backspace, remove last token
                if (key.id === "Backspace") {
                    popToken()
                    return
                }

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
            const key = getKeyByCode(e.code)

            if (key && pressedKeys.has(key)) {
                // remove key from pressedKeys set
                setPressedKeys(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(key)
                    return newSet
                })

                // need to prevent the default action here
                e.preventDefault()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [pressedKeys, onTokenSubmit])

    return (
        <div className="keyboard">
            {DEFAULT_KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyData) => (
                        <Key
                            key={keyData.id}
                            value={keyData.value}
                            display={keyData.display}
                            isPressed={pressedKeys.has(keyData)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard 
