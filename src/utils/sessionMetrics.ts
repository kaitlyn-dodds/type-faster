import type { TypingSession } from '../types/TypingSession'
import type { StatQuality } from '../features/challenge-review/types/StatQuality'

export function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function calculateRawWPM(session: TypingSession): number {
    const standardWords = session.totalCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

export function calculateNetWPM(session: TypingSession): number {
    const standardWords = session.correctCharacters / 5
    const minutes = session.totalTimeSeconds / 60
    return standardWords / minutes
}

export function calculateKeystrokeAccuracy(session: TypingSession): number {
    if (session.totalCharacters === 0) return 0
    return (session.correctCharacters / session.totalCharacters) * 100
}

export function formatAccuracy(accuracy: number): string {
    return accuracy.toFixed(2) + '%'
}

export function calculateWPMQuality(wpm: number): StatQuality {
    if (wpm < 20) return { message: 'Keep practicing!', quality: 'poor' }
    if (wpm < 40) return { message: 'You\'re getting there!', quality: 'fair' }
    if (wpm < 60) return { message: 'Great job!', quality: 'good' }
    if (wpm < 80) return { message: 'You\'re a pro!', quality: 'excellent' }
    return { message: 'No one\'s better than you!', quality: 'legendary' }
}

export function calculateAccuracyQuality(accuracy: number): StatQuality {
    if (accuracy < 50) return { message: 'Keep practicing!', quality: 'poor' }
    if (accuracy < 70) return { message: 'You\'re getting there!', quality: 'fair' }
    if (accuracy < 90) return { message: 'Great job!', quality: 'good' }
    if (accuracy < 99) return { message: 'You\'re a pro!', quality: 'excellent' }
    return { message: 'No one\'s better than you!', quality: 'legendary' }
}