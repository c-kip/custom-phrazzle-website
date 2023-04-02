import React from "react";
import { validPhraseRegex } from "../constants";
import Word from "./Word";

interface PhrazzleProps {
    phrase: string;
}

function parsePhrase(phrase: string): string[] {
    const parsedPhrase = phrase.trim();

    if (!validPhraseRegex.test(parsedPhrase)) {
        console.error(`Invalid phrase given: "${phrase}"`);
    }

    return parsedPhrase.split(" ");
}

function Phrazzle(props: PhrazzleProps) {
    const parsedPhraseWords = parsePhrase(props.phrase);

    return (
        <>
            {parsedPhraseWords.map((word, index) => {
                const key = index.toString() + word;

                return <Word word={word} key={key} parentKey={key} />;
            })}
        </>
    );
}

export default Phrazzle;
