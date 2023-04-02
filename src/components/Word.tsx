import React from "react";
import { LetterType } from "../constants";
import Letter from "./Letter";

interface WordProps {
    word: string;
    parentKey: string;
}

function Word(props: WordProps) {
    const word: string = props.word;

    return (
        <>
            {/* Map each letter in the word to a Letter component */}
            {word.split("").map((letter, index) => (
                <Letter
                    letter={letter}
                    type={LetterType.Correct}
                    key={props.parentKey + index.toString() + letter}
                />
            ))}
        </>
    );
}

export default Word;
