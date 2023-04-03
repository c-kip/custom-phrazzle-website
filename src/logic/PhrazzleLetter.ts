import { LetterType } from "../constants";

export class PhrazzleLetter {
    letter: string;
    type: LetterType;
    guessed: boolean;

    constructor(letter: string, type: LetterType, guessed: boolean) {
        this.letter = letter;
        this.type = type;
        this.guessed = guessed;
    }
}
