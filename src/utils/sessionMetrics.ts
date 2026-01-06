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

const QUALITY_MESSAGES = {
    poor: 'Keep practicing!',
    fair: 'You\'re getting there!',
    good: 'Great job!',
    excellent: 'You\'re a pro!',
    legendary: 'No one\'s better than you!'
} as const

type QualityLevel = keyof typeof QUALITY_MESSAGES

function getQualityFromScore(score: number, thresholds: { poor: number; fair: number; good: number; excellent: number }): StatQuality {
    let quality: QualityLevel

    if (score < thresholds.poor) {
        quality = 'poor'
    } else if (score < thresholds.fair) {
        quality = 'fair'
    } else if (score < thresholds.good) {
        quality = 'good'
    } else if (score < thresholds.excellent) {
        quality = 'excellent'
    } else {
        quality = 'legendary'
    }

    return {
        message: QUALITY_MESSAGES[quality],
        quality
    }
}

export function calculateWPMQuality(wpm: number): StatQuality {
    return getQualityFromScore(wpm, {
        poor: 20,
        fair: 40,
        good: 60,
        excellent: 80
    })
}

export function calculateAccuracyQuality(accuracy: number): StatQuality {
    return getQualityFromScore(accuracy, {
        poor: 50,
        fair: 70,
        good: 90,
        excellent: 99
    })
}