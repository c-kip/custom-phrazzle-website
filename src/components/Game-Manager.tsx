import React, { useEffect, useState } from "react";
import {
    lowerCaseLetter,
    spaceChar,
    upperCaseLetter,
    validPunctuation,
} from "../constants";
import Phrazzle from "./Phrazzle";
import { Typography } from "@mui/material";

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
    const [guess, setGuess] = useState("");
    const [finalGuess, setFinalGuess] = useState("");

    function updateGameState(state: GameState) {
        // Update the game msg based on the new state
        console.log(`Set game state to ${state}`);
        switch (state) {
            case GameState.start:
                setGameMsg(startGameMsg);
                setPhrase("");
                break;
            case GameState.guess:
                setGameMsg(guessGameMsg);
                break;
            case GameState.finish:
                setGameMsg(finishGameMsg);
                setGuess("");
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
        } else if (spaceChar.test(event.key)) {
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
                    setFinalGuess(guess);
                    break;
                case GameState.finish:
                    updateGameState(GameState.start);
                    break;
                default:
                    console.error("Invalid game state with enter key");
                    break;
            }
        }

        // Update the phrase to include the newest letter
        if (letter) {
            switch (gameState) {
                case GameState.start:
                    // During start, update the phrase
                    setPhrase(phrase + letter);
                    console.log(`Current phrase: "${phrase}"`);
                    console.log(`Phrase set to "${phrase + letter}"`);
                    break;
                case GameState.guess:
                    // During guess, update the guess
                    setGuess(guess);
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
        // Setup keyboard capturing
        document.addEventListener("keydown", keyboardHandler);

        return () => {
            document.removeEventListener("keydown", keyboardHandler);
        };
    });

    return (
        <>
            <Typography>{gameMsg}</Typography>
            <Phrazzle phrase={phrase} guess={finalGuess} />
        </>
    );
}

export default GameManager;
