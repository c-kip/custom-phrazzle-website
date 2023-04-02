import React from "react";
import { Box } from "@mui/material";
import { LetterType } from "../constants";

interface LetterProps {
    letter: string;
    type: LetterType;
}

function Letter(props: LetterProps) {
    let boxBackground: string;
    let textColour: string;

    switch (props.type) {
        case LetterType.Correct:
            boxBackground = "letter.background.correct";
            textColour = "letter.text.light";
            break;
        case LetterType.Miss:
            boxBackground = "letter.background.miss";
            textColour = "letter.text.light";
            break;
        case LetterType.DiffWord:
            boxBackground = "letter.background.diffWord";
            textColour = "letter.text.light";
            break;
        case LetterType.Close:
            boxBackground = "letter.background.close";
            textColour = "letter.text.light";
            break;
        case LetterType.Guess:
        default:
            boxBackground = "letter.background.guess";
            textColour = "letter.text.dark";
            break;
    }

    return (
        <Box sx={{ backgroundColor: boxBackground }}>
            <p color={textColour}>{props.letter}</p>
        </Box>
    );
}

export default Letter;
