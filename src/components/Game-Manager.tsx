import { Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    lowerCaseLetter,
    spaceChar,
    upperCaseLetter,
    validPunctuation,
} from "../constants";
import Phrazzle from "./Phrazzle";

enum GameState {
    start,
    guess,
    finish,
}

const startGameMsg =
    "Type the phrase you'd like to have others guess, then enter to complete it.";
const guessGameMsg =
    "Type in your guess and press enter to verify the results.";
const finishGameMsg =
    "Congratulations! You guessed correct! Press enter to start a new game.";

function GameManager() {
    const [gameState, setGameState] = useState(GameState.start);
    const [gameMsg, setGameMsg] = useState(startGameMsg);
    const [phrase, setPhrase] = useState("");
    const [guesses, setGuesses] = useState([""]);
    const [verifies, setVerifies] = useState([false]);

    const currentGuess = guesses[guesses.length - 1];

    function setFinish() {
        setGameState(GameState.finish);
    }

    function setLatestGuess(guess: string) {
        const allGuesses = [...guesses];
        allGuesses[allGuesses.length - 1] = guess;
        setGuesses(allGuesses);
    }

    function updateGameState(state: GameState) {
        // Update the game msg based on the new state
        switch (state) {
            case GameState.start:
                setGameMsg(startGameMsg);
                setPhrase("");
                break;
            case GameState.guess:
                setGameMsg(guessGameMsg);
                setGuesses([""]);
                break;
            case GameState.finish:
                setGameMsg(finishGameMsg);
                break;
            default:
                setGameMsg("Game broken. 🙁");
                console.error("Invalid state reached.");
                break;
        }

        setGameState(state);
    }

    function keyboardHandler(event: { key: string }) {
        let letter: string | null = null;

        // Check what kind of key was pressed, and validate it
        if (lowerCaseLetter.test(event.key)) {
            letter = event.key.toUpperCase();
        } else if (
            upperCaseLetter.test(event.key) ||
            validPunctuation.test(event.key)
        ) {
            letter = event.key;
        } else if (gameState === GameState.start && spaceChar.test(event.key)) {
            // Ignore multiple spaces in a row
            if (!spaceChar.test(phrase[phrase.length - 1])) {
                letter = event.key;
            }
        } else if (event.key.toUpperCase() === "ENTER") {
            switch (gameState) {
                case GameState.start:
                    updateGameState(GameState.guess);
                    break;
                case GameState.guess:
                    if (currentGuess.length === phrase.length) {
                        // Update the current guess to be verified, maintain all others
                        const allVerifies = [...verifies];
                        allVerifies[allVerifies.length - 1] = true;
                        allVerifies.push(false);

                        setVerifies(allVerifies);
                        setGuesses([...guesses, ""]);
                    }
                    break;
                case GameState.finish:
                    updateGameState(GameState.start);
                    break;
                default:
                    console.error("Invalid game state with enter key");
                    break;
            }
        } else if (event.key.toUpperCase() === "BACKSPACE") {
            switch (gameState) {
                case GameState.start:
                    // Remove a character
                    if (phrase.length > 0) {
                        setPhrase(phrase.slice(0, phrase.length - 1));
                        setLatestGuess(phrase.slice(0, phrase.length - 1));
                    }
                    break;
                case GameState.guess:
                    if (currentGuess.length > 0) {
                        const allGuesses = [...guesses];
                        const oneLessGuessLength = allGuesses.length - 1;

                        // If the "current" char is a space or punctuation, remove prev char too
                        if (
                            currentGuess.length >= 2 &&
                            (spaceChar.test(currentGuess.slice(-1)) ||
                                validPunctuation.test(currentGuess.slice(-1)))
                        ) {
                            allGuesses[oneLessGuessLength] = currentGuess.slice(
                                0,
                                -2 // remove space/punctuation as well
                            );

                            setGuesses(allGuesses);
                        } else {
                            allGuesses[oneLessGuessLength] = currentGuess.slice(
                                0,
                                -1
                            );

                            setGuesses(allGuesses);
                        }
                    }
                    break;
                case GameState.finish:
                    // Do nothing
                    break;
                default:
                    console.error("Invalid game state with backspace key");
                    break;
            }
        }

        // Update the phrase to include the newest letter
        if (letter) {
            switch (gameState) {
                case GameState.start:
                    // During start, update the phrase
                    setPhrase(phrase + letter);
                    setLatestGuess(phrase + letter);
                    break;
                case GameState.guess:
                    // Can't guess punctuation. It is filled in for you
                    if (validPunctuation.test(letter)) break;

                    // If the next letter is a space, include it
                    if (spaceChar.test(phrase[currentGuess.length + 1])) {
                        letter += " ";
                    }

                    // If next letter is a punctuation, include it
                    if (
                        validPunctuation.test(phrase[currentGuess.length + 1])
                    ) {
                        letter += phrase[currentGuess.length + 1];
                    }
                    // During guess, update the guess
                    if (currentGuess.length < phrase.length) {
                        setLatestGuess(currentGuess + letter);
                    }
                    break;
                case GameState.finish:
                    // Do nothing in finish state
                    break;
                default:
                    console.error("Invalid game state on keyboard parse");
                    break;
            }
        }
    }

    useEffect(() => {
        // TODO -> fix this required on all updates
        // Setup keyboard capturing
        document.addEventListener("keydown", keyboardHandler);

        return () => {
            document.removeEventListener("keydown", keyboardHandler);
        };
    });

    return (
        <>
            <Typography variant="h6" my={2}>
                {gameMsg}
            </Typography>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                {guesses.map((guess, index) => {
                    return (
                        <Phrazzle
                            phrase={phrase}
                            guess={guess}
                            verify={verifies[index]}
                            setFinish={setFinish}
                            key={index.toString() + guess}
                        />
                    );
                })}
            </Stack>
        </>
    );
}

export default GameManager;
