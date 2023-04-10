import React from "react";
import { Box, Typography } from "@mui/material";
import { LetterType, validPunctuation } from "../constants";
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

    if (letter === "space") return <Box minWidth="4%" />;

    if (letter === "blank")
        return (
            <Box ml={0.5} width="5%" border={2} borderRadius={1}>
                <Typography variant="h3" color="white">
                    X
                </Typography>
            </Box>
        );

    if (validPunctuation.test(letter))
        return (
            <Typography variant="h3" ml={0.5}>
                {letter}
            </Typography>
        );

    return (
        <Box
            textAlign="center"
            ml={0.5}
            width="5%"
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
