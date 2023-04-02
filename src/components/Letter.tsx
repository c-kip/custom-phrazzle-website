import React from "react";

enum LetterType {
    Guess,
    Miss,
    Close,
    Correct,
}

interface LetterProps {
    letter: string;
    type: LetterType;
}

function Letter(props: LetterProps) {
    return;
}

export default Letter;
