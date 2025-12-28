import './style.css'
import Key from '../Key'
import { useEffect, useState, useRef } from 'react'
import { DEFAULT_KEYBOARD_LAYOUT } from '../../../../data/constants/default_keyboard_layout'
import type { KeyData } from '../../types/KeyData'
import { useDispatch, useSelector } from 'react-redux'
import type { ChallengeToken } from '../../../typing-challenge/types/ChallengeToken'
import { addUnprocessedToken } from '../../../../store/reducers/typingSessionReducer'
import type { RootState } from '../../../../store/store'

function getKeyByCode(keyCode: string) {
    return DEFAULT_KEYBOARD_LAYOUT.flat().find(k => k.id === keyCode)
}

function deriveTokenFromQueue(
    queue: KeyData[],
    modifiers: Set<KeyData>
): { token: ChallengeToken | undefined; newQueue: KeyData[] } {
    // No keys in queue - nothing to process
    if (queue.length === 0) {
        return { token: undefined, newQueue: queue }
    }

    // Get and remove the oldest key from queue (FIFO - last element)
    const newQueue = [...queue]
    const key = newQueue.pop()!

    // Handle special keys w/ no modifiers and no real output (Backspace, Enter, Space)
    switch (key.id) {
        case "Backspace":
            return {
                token: { value: "Backspace", isEntered: true },
                newQueue
            }
        case "Enter":
            return {
                token: { value: "\n", isEntered: true },
                newQueue
            }
        case "Space":
            return {
                token: { value: " ", isEntered: true },
                newQueue
            }
    }

    // Apply modifier if available and key has altValue
    // TODO: Future enhancement - validate modifier-key compatibility
    // (e.g., Ctrl+C should not output 'C', some modifiers block character output)
    if (modifiers.size > 0 && key.altValue) {
        return {
            token: { value: key.altValue, isEntered: true },
            newQueue
        }
    }

    // Regular key without modifier
    return {
        token: { value: key.value, isEntered: true },
        newQueue
    }
}

function Keyboard({ onStartTimer }: any) {

    const dispatch = useDispatch()

    const timerStarted = useSelector((state: RootState) => state.typingSession.timer.started)

    const [keyQueue, setKeyQueue] = useState<KeyData[]>([])
    const [activeModifiers, setActiveModifiers] = useState<Set<KeyData>>(new Set())
    const [pendingToken, setPendingToken] = useState<ChallengeToken | undefined>(undefined)

    // useRef to keep track of active modifiers
    const activeModifiersRef = useRef<Set<KeyData>>(new Set())

    useEffect(() => {
        activeModifiersRef.current = activeModifiers
    }, [activeModifiers])


    // Dispatch pending tokens after state updates complete
    useEffect(() => {
        if (pendingToken) {
            dispatch(addUnprocessedToken(pendingToken))
            setPendingToken(undefined)  // Clear after dispatching
        }
    }, [pendingToken, dispatch])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = getKeyByCode(e.code)

            if (key) {
                // start timer if not started
                if (!timerStarted) {
                    onStartTimer()
                }

                // Categorize the key using isModifier property
                if (key.isModifier) {
                    // Add to active modifiers
                    setActiveModifiers(prev => {
                        const newSet = new Set(prev)
                        newSet.add(key)
                        return newSet
                    })
                } else {// Add to queue (at the front - index 0) and process immediately
                    setKeyQueue(prev => {
                        const updatedQueue = [key, ...prev]

                        // Derive token immediately with current queue state
                        const { token, newQueue } = deriveTokenFromQueue(
                            updatedQueue,
                            activeModifiersRef.current
                        )

                        // Store token to dispatch AFTER state update
                        setPendingToken(token)

                        // Return the queue with the derived key removed
                        return newQueue
                    })
                }

                // need to prevent the default action here
                e.preventDefault()
            } else {
                console.error("KeyData not found for code: ", e.code)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = getKeyByCode(e.code)

            if (key && key.isModifier) {
                // Only remove modifier keys when released
                setActiveModifiers(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(key)
                    return newSet
                })
            }
            // DO NOT remove keys from queue here!
            // Queue is only modified by deriveTokenFromQueue

            // need to prevent the default action here
            e.preventDefault()
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
            {DEFAULT_KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyData) => (
                        <Key
                            key={keyData.id}
                            value={keyData.value}
                            display={keyData.display}
                            isPressed={
                                keyQueue.some(k => k.id === keyData.id) ||
                                activeModifiers.has(keyData)
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
