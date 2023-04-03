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

    return (
        <Box
            justifyContent="center"
            sx={{
                backgroundColor: boxBackground,
                border: 2,
                borderRadius: 1,
                width: "5%",
                height: "5%",
            }}
        >
            <Typography variant="h3" color={textColour}>
                {letter}
            </Typography>
        </Box>
    );
}

export default Letter;
