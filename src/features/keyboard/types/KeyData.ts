export interface KeyData {
    /**
     * Unique key identifier (e.g. "1", "ctrl-left", "ctrl-right", "space")
     */
    id: string;
    /**
     * The value of the key from a KeyboardEvent (e.g. "a", "Enter")
     */
    value: string;
    /**
     * The visual representation of the key (e.g. "H", "CTRL", "BACKSPACE")
     */
    display: string;
    /**
     * The alternative value of the key (e.g. "~", "!")
     */
    altValue?: string;
}
