import React from "react";
import Word from "./Word";
import { Grid } from "@mui/material";

interface PhrazzleProps {
    phrase: string;
    guess: string;
}

function parsePhrase(phrase: string): string[] {
    return phrase.trim().split(" ");
}

function Phrazzle(props: PhrazzleProps) {
    const parsedPhraseWords = parsePhrase(props.phrase);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {parsedPhraseWords.map((word, index) => {
                const key = index.toString() + word;

                return <Word word={word} key={key} parentKey={key} />;
            })}
        </Grid>
    );
}

export default Phrazzle;
