
import fs from "fs";

// ====== VALUES ======
const id = "software-tools";
const name = "Software Tools";
const difficulty = "expert";
const text =
    "";

// Convert each character into a ChallengeToken object
const tokens = Array.from(text).map((char) => ({
    value: char,
    isEntered: false,
}));

// TypingChallenge structure
const output = {
    id,
    name,
    difficulty,
    tokens,
};

// Write to <difficulty>/<id>.json
const filename = `${difficulty}/${id}.json`;

fs.writeFileSync(filename, JSON.stringify(output, null, 2), "utf8");

console.log(`File written: ${filename}`);