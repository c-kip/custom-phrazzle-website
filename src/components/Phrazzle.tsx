import React from "react";
import { Grid } from "@mui/material";
import Letter from "./Letter";
import { LetterType } from "../constants";
import { PhrazzleLetter } from "../logic/PhrazzleLetter";

interface PhrazzleProps {
    phrase: string;
    guess: string;
    verify: boolean;
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
        // console.log(
        //     `Phrase letter: ${pLetter.letter}, guessed: ${pLetter.guessed}`
        // );
        // console.log(`Checking against ${guess.letter}`);
        if (pLetter.letter === guess.letter && !pLetter.guessed) {
            // mark the letter as "used"
            // console.log(`Match found`);
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
            if (pLetter.letter === guess.letter && !pLetter.guessed) {
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
    verify: boolean
): {
    phrase: PhrazzleLetter[][];
    guess: PhrazzleLetter[][];
} {
    const phrase = parsePhrase(rawPhrase);
    const guess = parsePhrase(rawGuess);

    // If the guess exists & has same length as phrase, verify it
    if (rawGuess !== "" && rawGuess.length === rawPhrase.length && verify) {
        phrase.forEach((pWord, wordIndex) => {
            pWord.forEach((pLetter, letterIndex) => {
                const guessLetter = guess[wordIndex][letterIndex];

                // If the letter is correct label it
                if (pLetter.letter === guessLetter.letter) {
                    pLetter.guessed = true;
                    guessLetter.type = LetterType.Correct;
                } else if (findNearMiss(pWord, guessLetter)) {
                    // Mark as in same word
                    console.log(
                        `Found same word match for ${guessLetter.letter}`
                    );
                    guessLetter.type = LetterType.RightWord;
                } else if (findDiffWord(phrase, guessLetter)) {
                    // Mark as in diff word
                    guessLetter.type = LetterType.WrongWord;
                } else {
                    // Mark as missing otherwise
                    guessLetter.type = LetterType.Miss;
                }
            });
        });
    }

    return { phrase, guess };
}

function Phrazzle(props: PhrazzleProps) {
    const { phrase, guess } = verifyPhrase(
        props.phrase,
        props.guess,
        props.verify
    );

    // Fill the guess with blanks at the end if the phrase has been set
    if (props.phrase.length > props.guess.length) {
        for (let wordIndex = 0; wordIndex < phrase.length; wordIndex++) {
            // Add a blank word if needed
            if (wordIndex >= guess.length) {
                guess.push([]);
            }

            const letterDiff =
                phrase[wordIndex].length - guess[wordIndex].length;
            if (letterDiff > 0) {
                for (let i = 0; i < letterDiff; i++) {
                    guess[wordIndex].push(
                        new PhrazzleLetter("?", LetterType.Guess, false)
                    );
                }
            }
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {guess.map((word, wordIndex) => {
                const key = wordIndex.toString() + word;

                return (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {/* Map each letter in the word to a Letter component */}
                        {word.map((phrazzleLetter, index) => (
                            <Letter
                                phrazzleLetter={phrazzleLetter}
                                key={
                                    wordIndex.toString() +
                                    "-" +
                                    index.toString() +
                                    phrazzleLetter
                                }
                            />
                        ))}
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default Phrazzle;
