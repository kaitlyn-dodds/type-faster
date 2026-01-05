import type { KeyData } from '../../features/keyboard/types/KeyData';

export const DEFAULT_KEYBOARD_LAYOUT: KeyData[][] = [
    // Row 1
    [
        { id: "Backquote", value: "`", display: "`", altValue: "~", img: "/assets/keyboard/default/backquote.png", pressedImg: "/assets/keyboard/pressed/backquote.png" },
        { id: "Digit1", value: "1", display: "1", altValue: "!", img: "/assets/keyboard/default/1.png", pressedImg: "/assets/keyboard/pressed/1.png" },
        { id: "Digit2", value: "2", display: "2", altValue: "@", img: "/assets/keyboard/default/2.png", pressedImg: "/assets/keyboard/pressed/2.png" },
        { id: "Digit3", value: "3", display: "3", altValue: "#", img: "/assets/keyboard/default/3.png", pressedImg: "/assets/keyboard/pressed/3.png" },
        { id: "Digit4", value: "4", display: "4", altValue: "$", img: "/assets/keyboard/default/4.png", pressedImg: "/assets/keyboard/pressed/4.png" },
        { id: "Digit5", value: "5", display: "5", altValue: "%", img: "/assets/keyboard/default/5.png", pressedImg: "/assets/keyboard/pressed/5.png" },
        { id: "Digit6", value: "6", display: "6", altValue: "^", img: "/assets/keyboard/default/6.png", pressedImg: "/assets/keyboard/pressed/6.png" },
        { id: "Digit7", value: "7", display: "7", altValue: "&", img: "/assets/keyboard/default/7.png", pressedImg: "/assets/keyboard/pressed/7.png" },
        { id: "Digit8", value: "8", display: "8", altValue: "*", img: "/assets/keyboard/default/8.png", pressedImg: "/assets/keyboard/pressed/8.png" },
        { id: "Digit9", value: "9", display: "9", altValue: "(", img: "/assets/keyboard/default/9.png", pressedImg: "/assets/keyboard/pressed/9.png" },
        { id: "Digit0", value: "0", display: "0", altValue: ")", img: "/assets/keyboard/default/0.png", pressedImg: "/assets/keyboard/pressed/0.png" },
        { id: "Minus", value: "-", display: "-", altValue: "_", img: "/assets/keyboard/default/dash.png", pressedImg: "/assets/keyboard/pressed/dash.png" },
        { id: "Equal", value: "=", display: "=", altValue: "+", img: "/assets/keyboard/default/equals.png", pressedImg: "/assets/keyboard/pressed/equals.png" },
        { id: "Backspace", value: "Backspace", display: "backspace", altValue: "Backspace", img: "/assets/keyboard/default/backspace.png", pressedImg: "/assets/keyboard/pressed/backspace.png" },
    ],

    // Row 2
    [
        { id: "Tab", value: "Tab", display: "tab", altValue: "\t", img: "/assets/keyboard/default/tab.png", pressedImg: "/assets/keyboard/pressed/tab.png" },
        { id: "KeyQ", value: "q", display: "q", altValue: "Q", img: "/assets/keyboard/default/q.png", pressedImg: "/assets/keyboard/pressed/q.png" },
        { id: "KeyW", value: "w", display: "w", altValue: "W", img: "/assets/keyboard/default/w.png", pressedImg: "/assets/keyboard/pressed/w.png" },
        { id: "KeyE", value: "e", display: "e", altValue: "E", img: "/assets/keyboard/default/e.png", pressedImg: "/assets/keyboard/pressed/e.png" },
        { id: "KeyR", value: "r", display: "r", altValue: "R", img: "/assets/keyboard/default/r.png", pressedImg: "/assets/keyboard/pressed/r.png" },
        { id: "KeyT", value: "t", display: "t", altValue: "T", img: "/assets/keyboard/default/t.png", pressedImg: "/assets/keyboard/pressed/t.png" },
        { id: "KeyY", value: "y", display: "y", altValue: "Y", img: "/assets/keyboard/default/y.png", pressedImg: "/assets/keyboard/pressed/y.png" },
        { id: "KeyU", value: "u", display: "u", altValue: "U", img: "/assets/keyboard/default/u.png", pressedImg: "/assets/keyboard/pressed/u.png" },
        { id: "KeyI", value: "i", display: "i", altValue: "I", img: "/assets/keyboard/default/i.png", pressedImg: "/assets/keyboard/pressed/i.png" },
        { id: "KeyO", value: "o", display: "o", altValue: "O", img: "/assets/keyboard/default/o.png", pressedImg: "/assets/keyboard/pressed/o.png" },
        { id: "KeyP", value: "p", display: "p", altValue: "P", img: "/assets/keyboard/default/p.png", pressedImg: "/assets/keyboard/pressed/p.png" },
        { id: "BracketLeft", value: "[", display: "[", altValue: "{", img: "/assets/keyboard/default/left_bracket.png", pressedImg: "/assets/keyboard/pressed/left_bracket.png" },
        { id: "BracketRight", value: "]", display: "]", altValue: "}", img: "/assets/keyboard/default/right_bracket.png", pressedImg: "/assets/keyboard/pressed/right_bracket.png" },
        { id: "Backslash", value: "\\", display: "\\", altValue: "|", img: "/assets/keyboard/default/backslash.png", pressedImg: "/assets/keyboard/pressed/backslash.png" },
    ],

    // Row 3
    [
        { id: "CapsLock", value: "CapsLock", display: "capslock", isModifier: true, img: "/assets/keyboard/default/caps_lock.png", pressedImg: "/assets/keyboard/pressed/caps_lock.png" },
        { id: "KeyA", value: "a", display: "a", altValue: "A", img: "/assets/keyboard/default/a.png", pressedImg: "/assets/keyboard/pressed/a.png" },
        { id: "KeyS", value: "s", display: "s", altValue: "S", img: "/assets/keyboard/default/s.png", pressedImg: "/assets/keyboard/pressed/s.png" },
        { id: "KeyD", value: "d", display: "d", altValue: "D", img: "/assets/keyboard/default/d.png", pressedImg: "/assets/keyboard/pressed/d.png" },
        { id: "KeyF", value: "f", display: "f", altValue: "F", img: "/assets/keyboard/default/f.png", pressedImg: "/assets/keyboard/pressed/f.png" },
        { id: "KeyG", value: "g", display: "g", altValue: "G", img: "/assets/keyboard/default/g.png", pressedImg: "/assets/keyboard/pressed/g.png" },
        { id: "KeyH", value: "h", display: "h", altValue: "H", img: "/assets/keyboard/default/h.png", pressedImg: "/assets/keyboard/pressed/h.png" },
        { id: "KeyJ", value: "j", display: "j", altValue: "J", img: "/assets/keyboard/default/j.png", pressedImg: "/assets/keyboard/pressed/j.png" },
        { id: "KeyK", value: "k", display: "k", altValue: "K", img: "/assets/keyboard/default/k.png", pressedImg: "/assets/keyboard/pressed/k.png" },
        { id: "KeyL", value: "l", display: "l", altValue: "L", img: "/assets/keyboard/default/l.png", pressedImg: "/assets/keyboard/pressed/l.png" },
        { id: "Semicolon", value: ";", display: ";", altValue: ":", img: "/assets/keyboard/default/semicolon.png", pressedImg: "/assets/keyboard/pressed/semicolon.png" },
        { id: "Quote", value: "'", display: "'", altValue: "\"", img: "/assets/keyboard/default/quote.png", pressedImg: "/assets/keyboard/pressed/quote.png" },
        { id: "Enter", value: "Enter", display: "enter", img: "/assets/keyboard/default/enter.png", pressedImg: "/assets/keyboard/pressed/enter.png" },
    ],

    // Row 4
    [
        { id: "ShiftLeft", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true, img: "/assets/keyboard/default/shift.png", pressedImg: "/assets/keyboard/pressed/shift.png" },
        { id: "KeyZ", value: "z", display: "z", altValue: "Z", img: "/assets/keyboard/default/z.png", pressedImg: "/assets/keyboard/pressed/z.png" },
        { id: "KeyX", value: "x", display: "x", altValue: "X", img: "/assets/keyboard/default/x.png", pressedImg: "/assets/keyboard/pressed/x.png" },
        { id: "KeyC", value: "c", display: "c", altValue: "C", img: "/assets/keyboard/default/c.png", pressedImg: "/assets/keyboard/pressed/c.png" },
        { id: "KeyV", value: "v", display: "v", altValue: "V", img: "/assets/keyboard/default/v.png", pressedImg: "/assets/keyboard/pressed/v.png" },
        { id: "KeyB", value: "b", display: "b", altValue: "B", img: "/assets/keyboard/default/b.png", pressedImg: "/assets/keyboard/pressed/b.png" },
        { id: "KeyN", value: "n", display: "n", altValue: "N", img: "/assets/keyboard/default/n.png", pressedImg: "/assets/keyboard/pressed/n.png" },
        { id: "KeyM", value: "m", display: "m", altValue: "M", img: "/assets/keyboard/default/m.png", pressedImg: "/assets/keyboard/pressed/m.png" },
        { id: "Comma", value: ",", display: ",", altValue: "<", img: "/assets/keyboard/default/comma.png", pressedImg: "/assets/keyboard/pressed/comma.png" },
        { id: "Period", value: ".", display: ".", altValue: ">", img: "/assets/keyboard/default/period.png", pressedImg: "/assets/keyboard/pressed/period.png" },
        { id: "Slash", value: "/", display: "/", altValue: "?", img: "/assets/keyboard/default/forwardslash.png", pressedImg: "/assets/keyboard/pressed/forwardslash.png" },
        { id: "ShiftRight", value: "Shift", display: "shift", altValue: "SHIFT", isModifier: true, img: "/assets/keyboard/default/shift.png", pressedImg: "/assets/keyboard/pressed/shift.png" },
    ],

    // Row 5
    [
        { id: "ControlLeft", value: "Control", display: "control", isModifier: true, img: "/assets/keyboard/default/ctrl.png", pressedImg: "/assets/keyboard/pressed/ctrl.png" },
        { id: "AltLeft", value: "Alt", display: "alt", isModifier: true, img: "/assets/keyboard/default/alt.png", pressedImg: "/assets/keyboard/pressed/alt.png" },
        { id: "Space", value: " ", display: "space", img: "/assets/keyboard/default/space.png", pressedImg: "/assets/keyboard/pressed/space.png" },
        { id: "AltRight", value: "Alt", display: "alt", isModifier: true, img: "/assets/keyboard/default/alt.png", pressedImg: "/assets/keyboard/pressed/alt.png" },
        { id: "ControlRight", value: "Control", display: "control", isModifier: true, img: "/assets/keyboard/default/ctrl.png", pressedImg: "/assets/keyboard/pressed/ctrl.png" },
    ],
];
