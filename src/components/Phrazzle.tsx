import { Stack } from "@mui/material";
import React from "react";
import { LetterType, maxCharPerLine, validPunctuation } from "../constants";
import { PhrazzleLetter } from "../logic/PhrazzleLetter";
import Letter from "./Letter";

interface PhrazzleProps {
    phrase: string;
    guess: string;
    verify: boolean;
    setFinish: Function;
}

function parsePhrase(phrase: string): PhrazzleLetter[][] {
    const words = phrase.trim().split(" ");
    const phrazzle: PhrazzleLetter[][] = [];

    words.forEach((word, wordIndex) => {
        phrazzle.push(
            word.split("").map((letter, letterIndex) => {
                return new PhrazzleLetter(letter, LetterType.Guess, false);
            })
        );
    });

    return phrazzle;
}

/**
 * Returns true if the guess letter can be found in the phrase, and marks the
 * matching letter as "guessed"
 * @param {PhrazzleLetter[]} phrase The word to verify against
 * @param {PhrazzleLetter} guess The letter to guess
 * @returns {boolean} True if the letter is in the word
 */
function findNearMiss(
    phrase: PhrazzleLetter[],
    guess: PhrazzleLetter
): boolean {
    return !phrase.every((pLetter) => {
        if (
            pLetter.letter === guess.letter &&
            !pLetter.guessed &&
            guess.type === LetterType.Guess
        ) {
            // mark the letter as "used"
            pLetter.guessed = true;
            return false; // end the every()
        }
        return true; // continue the every()
    });
}

function findDiffWord(
    phrase: PhrazzleLetter[][],
    guess: PhrazzleLetter
): boolean {
    return !phrase.every((pWord) => {
        return pWord.every((pLetter) => {
            if (
                pLetter.letter === guess.letter &&
                !pLetter.guessed &&
                guess.type === LetterType.Guess
            ) {
                // mark the letter as "used"
                pLetter.guessed = true;
                return false; // end the every()
            }
            return true; // continue the every()
        });
    });
}

// Lazy function that checks which letters are "correct", and so on
function verifyPhrase(
    rawPhrase: string,
    rawGuess: string,
    verify: boolean,
    setFinish: Function
): {
    phrase: PhrazzleLetter[][];
    guess: PhrazzleLetter[][];
} {
    const phrase = parsePhrase(rawPhrase);
    const guess = parsePhrase(rawGuess);
    let incorrectLetters = 0;

    // If the guess exists & has same length as phrase, verify it
    if (rawGuess !== "" && rawGuess.length === rawPhrase.length && verify) {
        // First loop marks correct
        phrase.forEach((pWord, wordIndex) => {
            pWord.forEach((pLetter, letterIndex) => {
                const guessLetter = guess[wordIndex][letterIndex];

                // If the letter is correct label it
                if (pLetter.letter === guessLetter.letter) {
                    pLetter.guessed = true;
                    guessLetter.type = LetterType.Correct;
                }
            });
        });

        // Second loop matches same word
        phrase.forEach((pWord, wordIndex) => {
            pWord.forEach((pLetter, letterIndex) => {
                const guessLetter = guess[wordIndex][letterIndex];

                // If the letter is in the word label it
                if (findNearMiss(pWord, guessLetter)) {
                    // Mark as in same word
                    guessLetter.type = LetterType.RightWord;
                    incorrectLetters++;
                }
            });
        });

        // Third loop marks remaining letters as either out of word match or
        // missing
        phrase.forEach((pWord, wordIndex) => {
            pWord.forEach((pLetter, letterIndex) => {
                const guessLetter = guess[wordIndex][letterIndex];

                // Check for out of word matches
                if (findDiffWord(phrase, guessLetter)) {
                    // Mark as in diff word
                    guessLetter.type = LetterType.WrongWord;
                    incorrectLetters++;
                } else if (guessLetter.type === LetterType.Guess) {
                    // Mark as missing otherwise
                    guessLetter.type = LetterType.Miss;
                    incorrectLetters++;
                }
            });
        });

        if (incorrectLetters === 0) {
            setFinish();
        }
    }

    return { phrase, guess };
}

function Phrazzle(props: PhrazzleProps) {
    const { phrase, guess } = verifyPhrase(
        props.phrase,
        props.guess,
        props.verify,
        props.setFinish
    );

    //Add blanks and punctuation
    const blankLetter = new PhrazzleLetter("blank", LetterType.Guess, false);
    const spaceLetter = new PhrazzleLetter("space", LetterType.Guess, false);

    //Add missing words
    for (let gWords = guess.length; gWords < phrase.length; gWords++) {
        guess.push([]);
    }

    // Fill with blanks, or punctuation
    for (let word = 0; word < phrase.length; word++) {
        if (guess[word].length === phrase[word].length) continue;
        for (let letter = 0; letter < phrase[word].length; letter++) {
            if (!guess[word][letter])
                if (validPunctuation.test(phrase[word][letter].letter))
                    guess[word][letter] = new PhrazzleLetter(
                        phrase[word][letter].letter,
                        LetterType.Guess,
                        false
                    );
                else guess[word][letter] = blankLetter;
        }
    }

    //Conert into lines
    const lines: PhrazzleLetter[][] = [];
    let line: PhrazzleLetter[] = [];

    guess.forEach((word) => {
        word.push(spaceLetter);

        if (line.length + word.length <= maxCharPerLine) line.push(...word);
        else {
            line.pop(); //remove last space
            lines.push(line);
            line = [...word];
        }
    });

    line.pop(); //remove last space
    lines.push(line);

    return (
        <Stack direction="column" spacing={2}>
            {lines.map((line, lineIndex) => (
                <Stack direction="row" key={lineIndex.toString()}>
                    {line.map((phrazzleLetter, index) => (
                        <Letter
                            key={lineIndex.toString() + "-" + index.toString()}
                            phrazzleLetter={phrazzleLetter}
                        />
                    ))}
                </Stack>
            ))}
        </Stack>
    );
}

export default Phrazzle;
