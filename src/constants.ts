export const upperCaseLetter = /^[A-Z]$/;
export const lowerCaseLetter = /^[a-z]$/;
export const validPunctuation = /^['",.!?:-]$/;
export const spaceChar = /^\ $/;

export enum LetterType {
    Guess,
    Miss,
    DiffWord,
    Close,
    Correct,
}
