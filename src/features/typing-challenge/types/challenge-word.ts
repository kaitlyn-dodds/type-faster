import type { ChallengeToken } from "./challenge-token"

export interface ChallengeWord {
    value: string,
    tokens: ChallengeToken[]
}