import React from "react";
import { LetterType } from "../constants";
import Letter from "./Letter";
import { Grid } from "@mui/material";

interface WordProps {
    word: string;
    parentKey: string;
}

function Word(props: WordProps) {
    const word: string = props.word;

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {/* Map each letter in the word to a Letter component */}
            {word.split("").map((letter, index) => (
                <Letter
                    letter={letter}
                    type={LetterType.Guess}
                    key={props.parentKey + index.toString() + letter}
                />
            ))}
        </Grid>
    );
}

export default Word;
