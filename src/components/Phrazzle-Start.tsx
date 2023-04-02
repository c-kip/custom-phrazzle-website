import React, { useEffect, useState } from "react";
import {
    lowerCaseLetter,
    spaceChar,
    upperCaseLetter,
    validPunctuation,
} from "../constants";
import Phrazzle from "./Phrazzle";

function PhrazzleStart() {
    const [phrase, setPhrase] = useState("");

    function keyboardHandler(event: { key: string }) {
        let letter: string | null = null;

        console.log(`The ${event.key} key was pressed`);

        if (lowerCaseLetter.test(event.key)) {
            letter = event.key.toUpperCase();
        } else if (
            upperCaseLetter.test(event.key) ||
            validPunctuation.test(event.key)
        ) {
            letter = event.key;
        } else if (spaceChar.test(event.key)) {
            // Ignore multiple spaces in a row
            if (!spaceChar.test(phrase[phrase.length - 1])) {
                letter = event.key;
            }
        }

        // Update the phrase to include the newest letter
        if (letter) {
            setPhrase(phrase + letter);
        }
    }

    useEffect(() => {
        // Setup keyboard capturing
        document.addEventListener("keydown", keyboardHandler);

        return () => {
            document.removeEventListener("keydown", keyboardHandler);
        };
    });

    return <Phrazzle phrase={phrase} />;
}

export default PhrazzleStart;
