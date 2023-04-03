import React from "react";
import { Grid } from "@mui/material";
import Letter from "./Letter";
import { LetterType } from "../constants";
import { PhrazzleLetter } from "../logic/PhrazzleLetter";

interface PhrazzleProps {
    phrase: string;
    guess: string;
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
 * @param {string} guess The letter to guess
 * @returns {boolean} True if the letter is in the word
 */
function findNearMiss(phrase: PhrazzleLetter[], guess: string): boolean {
    phrase.forEach((pLetter) => {
        if (pLetter.letter === guess && pLetter.type === LetterType.Guess) {
            pLetter.guessed = true;
            return true;
        }
    });

    return false;
}

function findDiffWord(phrase: PhrazzleLetter[][], guess: string): boolean {
    phrase.forEach((pWord) => {
        pWord.forEach((pLetter) => {
            if (pLetter.letter === guess && pLetter.type === LetterType.Guess) {
                pLetter.guessed = true;
                return true;
            }
        });
    });

    return false;
}

// Lazy function that checks which letters are "correct", and so on
function verifyPhrase(rawPhrase: string, rawGuess: string): PhrazzleLetter[][] {
    const phrase = parsePhrase(rawPhrase);
    const guess = rawGuess.trim().split(" ");

    // If the guess exists, verify it
    if (rawGuess !== "") {
        phrase.forEach((pWord, wordIndex) => {
            pWord.forEach((pLetter, letterIndex) => {
                const guessLetter = guess[wordIndex].charAt(letterIndex);

                // If the letter is correct label it
                if (pLetter.letter === guessLetter) {
                    pLetter.guessed = true;
                    pLetter.type = LetterType.Correct;
                } else if (findNearMiss(pWord, guessLetter)) {
                    // Mark as in same word
                    pLetter.type = LetterType.RightWord;
                } else if (findDiffWord(phrase, guessLetter)) {
                    // Mark as in diff word
                    pLetter.type = LetterType.WrongWord;
                } else {
                    // Mark as missing otherwise
                    pLetter.type = LetterType.Miss;
                }
            });
        });
    }

    return phrase;
}

function Phrazzle(props: PhrazzleProps) {
    const parsedPhraseWords = verifyPhrase(props.phrase, props.guess);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {parsedPhraseWords.map((word, wordIndex) => {
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
