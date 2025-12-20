export interface ChallengeToken {
    value: string,
    status: 'default' | 'entered' | 'enteredIncorrect'
}