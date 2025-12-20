
import fs from "fs";

// ====== VALUES ======
const id = "steve-jobs";
const name = "Steve Jobs Quotes";
const difficulty = "hard";
const text =
    "Steve Jobs was known for insisting that technology should feel intuitive, even if the engineering behind it was complex. During product launches, he focused on experience over specifications, famously saying, “Design is not just what it looks like.” That mindset shaped how people interacted with devices, emphasizing clarity, simplicity, and deliberate choices.";

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