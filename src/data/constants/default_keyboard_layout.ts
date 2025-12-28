import type { KeyData } from '../../features/keyboard/types/KeyData';

export const DEFAULT_KEYBOARD_LAYOUT: KeyData[][] = [
    // Row 1
    [
        { id: "Backquote", value: "`", display: "`", altValue: "~" },
        { id: "Digit1", value: "1", display: "1", altValue: "!" },
        { id: "Digit2", value: "2", display: "2", altValue: "@" },
        { id: "Digit3", value: "3", display: "3", altValue: "#" },
        { id: "Digit4", value: "4", display: "4", altValue: "$" },
        { id: "Digit5", value: "5", display: "5", altValue: "%" },
        { id: "Digit6", value: "6", display: "6", altValue: "^" },
        { id: "Digit7", value: "7", display: "7", altValue: "&" },
        { id: "Digit8", value: "8", display: "8", altValue: "*" },
        { id: "Digit9", value: "9", display: "9", altValue: "(" },
        { id: "Digit0", value: "0", display: "0", altValue: ")" },
        { id: "Minus", value: "-", display: "-", altValue: "_" },
        { id: "Equal", value: "=", display: "=", altValue: "+" },
        { id: "Backspace", value: "Backspace", display: "backspace" },
    ],

    // Row 2
    [
        { id: "Tab", value: "Tab", display: "tab", altValue: "\t" },
        { id: "KeyQ", value: "q", display: "q", altValue: "Q" },
        { id: "KeyW", value: "w", display: "w", altValue: "W" },
        { id: "KeyE", value: "e", display: "e", altValue: "E" },
        { id: "KeyR", value: "r", display: "r", altValue: "R" },
        { id: "KeyT", value: "t", display: "t", altValue: "T" },
        { id: "KeyY", value: "y", display: "y", altValue: "Y" },
        { id: "KeyU", value: "u", display: "u", altValue: "U" },
        { id: "KeyI", value: "i", display: "i", altValue: "I" },
        { id: "KeyO", value: "o", display: "o", altValue: "O" },
        { id: "KeyP", value: "p", display: "p", altValue: "P" },
        { id: "BracketLeft", value: "[", display: "[", altValue: "{" },
        { id: "BracketRight", value: "]", display: "]", altValue: "}" },
        { id: "Backslash", value: "\\", display: "\\", altValue: "|" },
    ],

    // Row 3
    [
        { id: "CapsLock", value: "CapsLock", display: "capslock" },
        { id: "KeyA", value: "a", display: "a", altValue: "A" },
        { id: "KeyS", value: "s", display: "s", altValue: "S" },
        { id: "KeyD", value: "d", display: "d", altValue: "D" },
        { id: "KeyF", value: "f", display: "f", altValue: "F" },
        { id: "KeyG", value: "g", display: "g", altValue: "G" },
        { id: "KeyH", value: "h", display: "h", altValue: "H" },
        { id: "KeyJ", value: "j", display: "j", altValue: "J" },
        { id: "KeyK", value: "k", display: "k", altValue: "K" },
        { id: "KeyL", value: "l", display: "l", altValue: "L" },
        { id: "Semicolon", value: ";", display: ";", altValue: ":" },
        { id: "Quote", value: "'", display: "'", altValue: "\"" },
        { id: "Enter", value: "Enter", display: "enter" },
    ],

    // Row 4
    [
        { id: "ShiftLeft", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true },
        { id: "KeyZ", value: "z", display: "z", altValue: "Z" },
        { id: "KeyX", value: "x", display: "x", altValue: "X" },
        { id: "KeyC", value: "c", display: "c", altValue: "C" },
        { id: "KeyV", value: "v", display: "v", altValue: "V" },
        { id: "KeyB", value: "b", display: "b", altValue: "B" },
        { id: "KeyN", value: "n", display: "n", altValue: "N" },
        { id: "KeyM", value: "m", display: "m", altValue: "M" },
        { id: "Comma", value: ",", display: ",", altValue: "<" },
        { id: "Period", value: ".", display: ".", altValue: ">" },
        { id: "Slash", value: "/", display: "/", altValue: "?" },
        { id: "ShiftRight", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true },
    ],

    // Row 5
    [
        { id: "ControlLeft", value: "Control", display: "control", isModifier: true },
        { id: "AltLeft", value: "Alt", display: "alt", isModifier: true },
        { id: "Space", value: " ", display: "space" },
        { id: "AltRight", value: "Alt", display: "alt", isModifier: true },
        { id: "ControlRight", value: "Control", display: "control", isModifier: true },
    ],
];
