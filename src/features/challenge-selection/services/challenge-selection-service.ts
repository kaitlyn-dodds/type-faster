import type { TypingChallenge } from "../../typing-challenge/types/typing-challenge";

// easy challenges
import brownFoxJson from "../../../data/challenges/easy/brown-fox.json";
import easyMorningJson from "../../../data/challenges/easy/easy-morning.json";
import easyFingersJson from "../../../data/challenges/easy/easy-fingers.json";

// medium challenges
import octopusJson from "../../../data/challenges/medium/octopus.json";
import adventureMoviesJson from "../../../data/challenges/medium/adventure-movies.json";
import fantasyNovelsJson from "../../../data/challenges/medium/fantasy-novels.json";

// hard challenges
import starWarsJson from "../../../data/challenges/hard/star-wars.json";
import stephenKingsQuotesJson from "../../../data/challenges/hard/stephen-kings-quotes.json";
import steveJobsQuotesJson from "../../../data/challenges/hard/steve-jobs-quotes.json";

// collect all challenges
const challenges = [
    brownFoxJson as TypingChallenge,
    easyMorningJson as TypingChallenge,
    easyFingersJson as TypingChallenge,
    octopusJson as TypingChallenge,
    adventureMoviesJson as TypingChallenge,
    fantasyNovelsJson as TypingChallenge,
    starWarsJson as TypingChallenge,
    stephenKingsQuotesJson as TypingChallenge,
    steveJobsQuotesJson as TypingChallenge,
];

export function getChallengesByDifficulty(
    difficulty: TypingChallenge["difficulty"]
): TypingChallenge[] {
    return challenges.filter((c: TypingChallenge) => c.difficulty === difficulty);
}

export function getChallengeById(id: string): TypingChallenge | undefined {
    return challenges.find(c => c.id === id);
}