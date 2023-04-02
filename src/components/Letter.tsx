import React from "react";
import { Box } from "@mui/material";
import { LetterType } from "../constants";

interface LetterProps {
    letter: string;
    type: LetterType;
}

function Letter(props: LetterProps) {
    switch (props.type) {
        case LetterType.Correct:
            console.log(`${props.letter} is correct`);
            break;
        case LetterType.Miss:
            console.log(`${props.letter} is a miss`);
            break;
        case LetterType.DiffWord:
            console.log(`${props.letter} is in a different word`);
            break;
        case LetterType.Close:
            console.log(`${props.letter} is close`);
            break;
        case LetterType.Guess:
        default:
            console.log(`${props.letter} is a guess`);
            break;
    }

    return (
        <Box sx={{ backgroundColor: "primary.dark" }}>
            <p>{props.letter}</p>
        </Box>
    );
}

export default Letter;
