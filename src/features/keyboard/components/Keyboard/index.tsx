import './style.css'
import Key from '../Key'
import { useEffect, useState } from 'react'
import type { Token } from '../../../../types/Token'
import { DEFAULT_KEYBOARD_LAYOUT } from '../../../../constants/default_keyboard_layout'
import type { KeyData } from '../../../../types'

interface KeyboardProps {
    onTokenSubmit: (token: Token) => void
}

function getKeyByCode(keyCode: string) {
    return DEFAULT_KEYBOARD_LAYOUT.flat().find(k => k.id === keyCode)
}

function deriveTokenFromKeys(keys: Set<KeyData>) {
    // if includes backspace, return backspace token
    const backspace = getKeyByCode("Backspace")
    if (backspace && keys.has(backspace)) {
        return {
            value: "Backspace",
            isEntered: true
        }
    }

    // if includes enter, return new line token
    const enter = getKeyByCode("Enter")
    if (enter && keys.has(enter)) {
        return {
            value: "\n",
            isEntered: true
        }
    }

    // if includes space, return space token
    const space = getKeyByCode("Space")
    if (space && keys.has(space)) {
        return {
            value: " ",
            isEntered: true
        }
    }

    // if includes shift (could be left or right shift) , toggle boolean
    const shiftLeft = getKeyByCode("ShiftLeft")
    const shiftRight = getKeyByCode("ShiftRight")
    const containsModifier = (shiftLeft && keys.has(shiftLeft)) || (shiftRight && keys.has(shiftRight))

    // loop over remaining keys, apply shift modifier to first key if containsShift is true
    for (const key of keys) {
        // skip modifier keys
        if (containsModifier && (key.id === "ShiftLeft" || key.id === "ShiftRight")) continue

        if (containsModifier && key.altValue) {
            return {
                value: key.altValue,
                isEntered: true
            }
        }

        // if no shift, return first key value
        return {
            value: key.value,
            isEntered: true
        }
    }

    console.log("No valid key found")
}

function Keyboard({ onTokenSubmit }: KeyboardProps) {
    const [pressedKeys, setPressedKeys] = useState<Set<KeyData>>(new Set())

    useEffect(() => {
        // adds key to pressedKeys set
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = getKeyByCode(e.code)

            if (key) {
                const newPressedKeys = new Set(pressedKeys)
                newPressedKeys.add(key)
                setPressedKeys(newPressedKeys)

                const token: Token | undefined = deriveTokenFromKeys(newPressedKeys)

                // nothing to do if no token
                if (!token) return

                onTokenSubmit(token)

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
