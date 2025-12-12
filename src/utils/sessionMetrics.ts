import type { Session } from '../types/Session'

export function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function calculateRawWPM(session: Session): number {
    const standardWords = session.totalCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

export function calculateNetWPM(session: Session): number {
    const standardWords = session.correctCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

export function calculateKeystrokeAccuracy(session: Session): number {
    if (session.totalCharacters === 0) return 0
    return (session.correctCharacters / session.totalCharacters) * 100
}

export function formatAccuracy(accuracy: number): string {
    return accuracy.toFixed(2) + '%'
}
