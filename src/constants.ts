export const upperCaseLetter = /^[A-Z]$/;
export const lowerCaseLetter = /^[a-z]$/;
export const validPunctuation = /^['",.!?:-]$/;
export const spaceChar = /^\ $/;

export enum LetterType {
    Guess,
    Miss,
    WrongWord,
    RightWord,
    Correct,
}

export const maxCharPerLine = 20