import React from "react";
import { Box, Typography } from "@mui/material";
import { LetterType } from "../constants";
import { PhrazzleLetter } from "../logic/PhrazzleLetter";

interface LetterProps {
    phrazzleLetter: PhrazzleLetter;
}

function Letter(props: LetterProps) {
    const letter = props.phrazzleLetter.letter;
    const type = props.phrazzleLetter.type;
    let boxBackground: string;
    let textColour: string;

    switch (type) {
        case LetterType.Correct:
            boxBackground = "letter.background.correct";
            textColour = "letter.text.light";
            break;
        case LetterType.Miss:
            boxBackground = "letter.background.miss";
            textColour = "letter.text.light";
            break;
        case LetterType.WrongWord:
            boxBackground = "letter.background.diffWord";
            textColour = "letter.text.light";
            break;
        case LetterType.RightWord:
            boxBackground = "letter.background.close";
            textColour = "letter.text.light";
            break;
        case LetterType.Guess:
        default:
            boxBackground = "letter.background.guess";
            textColour = "letter.text.dark";
            break;
    }

    if (letter === " ")
        return <Box minWidth="4%"/>

    return (
        <Box
            display="flex"
            justifyContent="center"
            ml={0.5}
            width="5%"
            height="5%"
            bgcolor={boxBackground}
            border={2}
            borderRadius={1}
        >
            <Typography variant="h3" color={textColour}>
                {letter}
            </Typography>
        </Box>
    );
}

export default Letter;
