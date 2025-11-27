import type { KeyData } from '../types/KeyData';

export const DEFAULT_KEYBOARD_LAYOUT: KeyData[][] = [
    // Row 1
    [
        { id: "Backquote", value: "`", display: "`" },
        { id: "Digit1", value: "1", display: "1" },
        { id: "Digit2", value: "2", display: "2" },
        { id: "Digit3", value: "3", display: "3" },
        { id: "Digit4", value: "4", display: "4" },
        { id: "Digit5", value: "5", display: "5" },
        { id: "Digit6", value: "6", display: "6" },
        { id: "Digit7", value: "7", display: "7" },
        { id: "Digit8", value: "8", display: "8" },
        { id: "Digit9", value: "9", display: "9" },
        { id: "Digit0", value: "0", display: "0" },
        { id: "Minus", value: "-", display: "-" },
        { id: "Equal", value: "=", display: "=" },
        { id: "Backspace", value: "Backspace", display: "backspace" },
    ],

    // Row 2
    [
        { id: "Tab", value: "Tab", display: "tab" },
        { id: "KeyQ", value: "q", display: "q" },
        { id: "KeyW", value: "w", display: "w" },
        { id: "KeyE", value: "e", display: "e" },
        { id: "KeyR", value: "r", display: "r" },
        { id: "KeyT", value: "t", display: "t" },
        { id: "KeyY", value: "y", display: "y" },
        { id: "KeyU", value: "u", display: "u" },
        { id: "KeyI", value: "i", display: "i" },
        { id: "KeyO", value: "o", display: "o" },
        { id: "KeyP", value: "p", display: "p" },
        { id: "BracketLeft", value: "[", display: "[" },
        { id: "BracketRight", value: "]", display: "]" },
        { id: "Backslash", value: "\\", display: "\\" },
    ],

    // Row 3
    [
        { id: "CapsLock", value: "CapsLock", display: "capslock" },
        { id: "KeyA", value: "a", display: "a" },
        { id: "KeyS", value: "s", display: "s" },
        { id: "KeyD", value: "d", display: "d" },
        { id: "KeyF", value: "f", display: "f" },
        { id: "KeyG", value: "g", display: "g" },
        { id: "KeyH", value: "h", display: "h" },
        { id: "KeyJ", value: "j", display: "j" },
        { id: "KeyK", value: "k", display: "k" },
        { id: "KeyL", value: "l", display: "l" },
        { id: "Semicolon", value: ";", display: ";" },
        { id: "Quote", value: "'", display: "'" },
        { id: "Enter", value: "Enter", display: "enter" },
    ],

    // Row 4
    [
        { id: "ShiftLeft", value: "Shift", display: "shift" },
        { id: "KeyZ", value: "z", display: "z" },
        { id: "KeyX", value: "x", display: "x" },
        { id: "KeyC", value: "c", display: "c" },
        { id: "KeyV", value: "v", display: "v" },
        { id: "KeyB", value: "b", display: "b" },
        { id: "KeyN", value: "n", display: "n" },
        { id: "KeyM", value: "m", display: "m" },
        { id: "Comma", value: ",", display: "," },
        { id: "Period", value: ".", display: "." },
        { id: "Slash", value: "/", display: "/" },
        { id: "ShiftRight", value: "Shift", display: "shift" },
    ],

    // Row 5
    [
        { id: "ControlLeft", value: "Control", display: "control" },
        { id: "AltLeft", value: "Alt", display: "alt" },
        { id: "Space", value: " ", display: "space" },
        { id: "AltRight", value: "Alt", display: "alt" },
        { id: "ControlRight", value: "Control", display: "control" },
    ],
];
