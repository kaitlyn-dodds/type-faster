import type { KeyData } from '../../features/keyboard/types/KeyData';

export const DEFAULT_KEYBOARD_LAYOUT: KeyData[][] = [
    // Row 1
    [
        { id: "Backquote", value: "`", display: "`", altValue: "~", img: "/assets/keyboard/q.png" },
        { id: "Digit1", value: "1", display: "1", altValue: "!", img: "/assets/keyboard/1.png" },
        { id: "Digit2", value: "2", display: "2", altValue: "@", img: "/assets/keyboard/2.png" },
        { id: "Digit3", value: "3", display: "3", altValue: "#", img: "/assets/keyboard/3.png" },
        { id: "Digit4", value: "4", display: "4", altValue: "$", img: "/assets/keyboard/4.png" },
        { id: "Digit5", value: "5", display: "5", altValue: "%", img: "/assets/keyboard/5.png" },
        { id: "Digit6", value: "6", display: "6", altValue: "^", img: "/assets/keyboard/6.png" },
        { id: "Digit7", value: "7", display: "7", altValue: "&", img: "/assets/keyboard/7.png" },
        { id: "Digit8", value: "8", display: "8", altValue: "*", img: "/assets/keyboard/8.png" },
        { id: "Digit9", value: "9", display: "9", altValue: "(", img: "/assets/keyboard/9.png" },
        { id: "Digit0", value: "0", display: "0", altValue: ")", img: "/assets/keyboard/0.png" },
        { id: "Minus", value: "-", display: "-", altValue: "_", img: "/assets/keyboard/minus.png" },
        { id: "Equal", value: "=", display: "=", altValue: "+", img: "/assets/keyboard/equals.png" },
        { id: "Backspace", value: "Backspace", display: "backspace", altValue: "Backspace", img: "/assets/keyboard/backspace.png" },
    ],

    // Row 2
    [
        { id: "Tab", value: "Tab", display: "tab", altValue: "\t", img: "/assets/keyboard/tab.png" },
        { id: "KeyQ", value: "q", display: "q", altValue: "Q", img: "/assets/keyboard/q.png" },
        { id: "KeyW", value: "w", display: "w", altValue: "W", img: "/assets/keyboard/w.png" },
        { id: "KeyE", value: "e", display: "e", altValue: "E", img: "/assets/keyboard/e.png" },
        { id: "KeyR", value: "r", display: "r", altValue: "R", img: "/assets/keyboard/r.png" },
        { id: "KeyT", value: "t", display: "t", altValue: "T", img: "/assets/keyboard/t.png" },
        { id: "KeyY", value: "y", display: "y", altValue: "Y", img: "/assets/keyboard/y.png" },
        { id: "KeyU", value: "u", display: "u", altValue: "U", img: "/assets/keyboard/u.png" },
        { id: "KeyI", value: "i", display: "i", altValue: "I", img: "/assets/keyboard/i.png" },
        { id: "KeyO", value: "o", display: "o", altValue: "O", img: "/assets/keyboard/o.png" },
        { id: "KeyP", value: "p", display: "p", altValue: "P", img: "/assets/keyboard/p.png" },
        { id: "BracketLeft", value: "[", display: "[", altValue: "{", img: "/assets/keyboard/left_bracket.png" },
        { id: "BracketRight", value: "]", display: "]", altValue: "}", img: "/assets/keyboard/right_bracket.png" },
        { id: "Backslash", value: "\\", display: "\\", altValue: "|", img: "/assets/keyboard/backslash.png" },
    ],

    // Row 3
    [
        { id: "CapsLock", value: "CapsLock", display: "capslock", img: "/assets/keyboard/caps_lock.png" },
        { id: "KeyA", value: "a", display: "a", altValue: "A", img: "/assets/keyboard/a.png" },
        { id: "KeyS", value: "s", display: "s", altValue: "S", img: "/assets/keyboard/s.png" },
        { id: "KeyD", value: "d", display: "d", altValue: "D", img: "/assets/keyboard/d.png" },
        { id: "KeyF", value: "f", display: "f", altValue: "F", img: "/assets/keyboard/f.png" },
        { id: "KeyG", value: "g", display: "g", altValue: "G", img: "/assets/keyboard/g.png" },
        { id: "KeyH", value: "h", display: "h", altValue: "H", img: "/assets/keyboard/h.png" },
        { id: "KeyJ", value: "j", display: "j", altValue: "J", img: "/assets/keyboard/j.png" },
        { id: "KeyK", value: "k", display: "k", altValue: "K", img: "/assets/keyboard/k.png" },
        { id: "KeyL", value: "l", display: "l", altValue: "L", img: "/assets/keyboard/l.png" },
        { id: "Semicolon", value: ";", display: ";", altValue: ":", img: "/assets/keyboard/semicolon.png" },
        { id: "Quote", value: "'", display: "'", altValue: "\"", img: "/assets/keyboard/quote.png" },
        { id: "Enter", value: "Enter", display: "enter", img: "/assets/keyboard/enter.png" },
    ],

    // Row 4
    [
        { id: "ShiftLeft", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true, img: "/assets/keyboard/shift.png" },
        { id: "KeyZ", value: "z", display: "z", altValue: "Z", img: "/assets/keyboard/z.png" },
        { id: "KeyX", value: "x", display: "x", altValue: "X", img: "/assets/keyboard/x.png" },
        { id: "KeyC", value: "c", display: "c", altValue: "C", img: "/assets/keyboard/c.png" },
        { id: "KeyV", value: "v", display: "v", altValue: "V", img: "/assets/keyboard/v.png" },
        { id: "KeyB", value: "b", display: "b", altValue: "B", img: "/assets/keyboard/b.png" },
        { id: "KeyN", value: "n", display: "n", altValue: "N", img: "/assets/keyboard/n.png" },
        { id: "KeyM", value: "m", display: "m", altValue: "M", img: "/assets/keyboard/q.png" },
        { id: "Comma", value: ",", display: ",", altValue: "<", img: "/assets/keyboard/q.png" },
        { id: "Period", value: ".", display: ".", altValue: ">", img: "/assets/keyboard/q.png" },
        { id: "Slash", value: "/", display: "/", altValue: "?", img: "/assets/keyboard/q.png" },
        { id: "ShiftRight", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true, img: "/assets/keyboard/q.png" },
    ],

    // Row 5
    [
        { id: "ControlLeft", value: "Control", display: "control", isModifier: true, img: "/assets/keyboard/q.png" },
        { id: "AltLeft", value: "Alt", display: "alt", isModifier: true, img: "/assets/keyboard/q.png" },
        { id: "Space", value: " ", display: "space", img: "/assets/keyboard/space.png" },
        { id: "AltRight", value: "Alt", display: "alt", isModifier: true, img: "/assets/keyboard/q.png" },
        { id: "ControlRight", value: "Control", display: "control", isModifier: true, img: "/assets/keyboard/q.png" },
    ],
];
